package com.yetu.controlcenter.controllers

import java.net.ConnectException
import java.util.NoSuchElementException
import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ Environment, Silhouette }
import com.mohiva.play.silhouette.impl.authenticators.SessionAuthenticator
import com.yetu.controlcenter.utils.{ ConfigLoader => Config, WSUtils }
import com.yetu.controlcenter.views
import com.yetu.play.authenticator.models.User
import com.yetu.play.authenticator.models.daos.OAuth2InfoDAO
import com.yetu.play.authenticator.utils.di.ConfigLoader
import play.api.Play
import play.api.Play.current
import play.api.libs.ws.WS
import play.api.mvc.{ AnyContent, Result }
import play.api.libs.json._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{ Failure, Success }

/**
 * The ControlCenter application controller
 *
 * @param env The Silhouette environment.
 */
class Application @Inject() (implicit val env: Environment[User, SessionAuthenticator], oauth2Dao: OAuth2InfoDAO)
    extends Silhouette[User, SessionAuthenticator] {

  /**
   * * Main entry point that loads the frontend
   * @return
   */
  def entryPoint = SecuredAction {
    implicit request =>
      {
        Ok(views.html.index(Config.frontendConfig.get))
      }
  }

  /**
   * * Method returns incoming data from http request as it is whether succesful or not.
   * * Client-side should handle the incoming data properly
   * @return play.api.mvc.Result
   */
  def profile = SecuredAction.async { implicit request =>
    val result = for {
      accessToken <- getAccessToken(request)
      result <- WSUtils.wrapResponse(WS.url(ConfigLoader.AuthServer.profileUrl).withQueryString(WSUtils.authorizationQueryString(accessToken)))
    } yield result
    result.recover(withErrorHandling)
  }

  /**
   * * Method that acts as proxy between household services and front-end
   * * Client-side should handle the incoming data properly
   * @return play.api.mvc.Result
   */
  def household(path: String) = SecuredAction.async { implicit request =>
    val result = for {
      accessToken <- getAccessToken(request)
      result <- WSUtils.wrapResponse(WS.url(s"${Config.householdServicesHost}${WSUtils.addLeadingSlash(path)}")
        .withHeaders(WSUtils.authorizationHeader(accessToken))
        .withBody(request.body.asText.getOrElse("")),
        request.method)
    } yield result
    result.recover(withErrorHandling)
  }

  /**
   * *
   * @return
   */
  def withErrorHandling: PartialFunction[Throwable, Result] = {
    case x: NoSuchElementException => InternalServerError("no access token")
    // any unhandled case here will result in play's default 500 or 404 error
  }

  /**
   * * Retrieves access_token with the help of request.identity
   * * If there is no access tokens, t throws NoSuchElementException
   * * this is designed to fail, so there are no further actions.
   * @param request
   * @return
   */
  def getAccessToken(request: SecuredRequest[AnyContent]): Future[String] = {
    for {
      info <- oauth2Dao.find(request.identity.loginInfo)
      accessToken = info.map(_.accessToken).get
    } yield accessToken
  }

  /**
   * Redirects to the frontend handler passing the nest token
   *
   * @return
   */
  def redirectNestToken(code: String) = SecuredAction.async { implicit request =>
    val clientId = Play.configuration.getString("nest.clientId").get
    val clientSecret = Play.configuration.getString("nest.clientSecret").get
    val oauthUrl = Play.configuration.getString("nest.oauthUrl").get
    val accessTokenUrl: String = s"$oauthUrl/access_token?code=$code&client_id=$clientId&client_secret=$clientSecret&grant_type=authorization_code"
    println(accessTokenUrl)

    // TODO: Handle ConnectException (e.g. nest API not reachable)
    WS.url(accessTokenUrl).execute("POST").map { response =>
      if (response.status == 200) {
        // TODO: Check "state" query parameter for consistency
        val accessToken = (Json.parse(response.body) \ "access_token").asOpt[String].getOrElse("")
        // TODO: Send access token to household API
        println(s"Nest access token = $accessToken")
        Redirect(s"/#/devices/add/nest/ok")
      } else {
        Redirect(s"/#/devices/add/nest/failed")
      }
    }
  }
}
