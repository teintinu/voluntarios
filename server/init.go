package cvv

import (
	"net/http"
)

func init() {
	http.HandleFunc("/api/hw", handleHello)
	http.HandleFunc("/api/hw2", handleHello2)

	// http.HandleFunc("/api/user/get", HandleUserGet)
	// http.HandleFunc("/api/user/save", HandleUserSave)

	http.HandleFunc("/api/user/porId", HandleQryUserPorId)

	http.HandleFunc("/api/user/signupWithPassword", HandleUserSignupWithPassword)

	//http.HandleFunc("/api/user/loginWithPassword", HandleUserLoginWithPassword)
	//http.HandleFunc("/api/user/loginWithGoogle", HandleUserLoginWithGoogle)
	//http.HandleFunc("/api/user/loginWithFacebook", HandleUserLoginWithFacebook)
	//http.HandleFunc("/api/user/loginWithMicrosoft", HandleUserLoginWithMicrosoft)
	//http.HandleFunc("/api/user/loginWithiCloud", HandleUserLoginWithICloud)

	// http.HandleFunc("/api/voluntario/get", HandleVoluntarioGet)
	// http.HandleFunc("/api/voluntario/save", HandleVoluntarioSave)

}
