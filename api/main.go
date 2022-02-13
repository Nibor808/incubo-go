package main

import (
	"encoding/json"
	"log"
	"net/http"
	"net/smtp"
	"os"

	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
)

type emailData struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
	Captcha string `json:"recaptchaValue"`
}

type response struct {
	Type    string
	Message string
}

func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Println("ENV file not found. But is it really lost?", err)
	}
}

func main() {
	r := httprouter.New()

	r.POST("/sendmail", sendMail)

	log.Println("Listening on 5000")
	log.Fatal(http.ListenAndServe(":5000", r))
}

func sendMail(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	var js []byte

	var data emailData

	err := decoder.Decode(&data)
	if err != nil {
		js, err = json.Marshal(response{
			Type:    "error",
			Message: "Oops! We broke it. Please try again later.",
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	adminEmail, aEExists := os.LookupEnv("ADMIN_EMAIL")
	mailPass, mPExists := os.LookupEnv("MAIL_PASS")
	mailHost, mHExists := os.LookupEnv("MAIL_HOST")

	if !aEExists || !mPExists || !mHExists {
		log.Fatal("cannot get mail env variables")
	}

	auth := smtp.PlainAuth("", adminEmail, mailPass, mailHost)
	to := []string{adminEmail}

	msg := []byte("To: " + adminEmail + "\r\n" +
		"Subject: Development Inquiry \r\n" +
		"From: " + adminEmail + "\r\n" +
		"Reply: " + adminEmail + "\r\n" +
		data.Name +
		"\r\n" +
		"\r\n" +
		data.Email +
		"\r\n" +
		"\r\n" +
		data.Message +
		"\r\n")

	err = smtp.SendMail(mailHost+":587", auth, adminEmail, to, msg)

	if err != nil {
		log.Println("Failed to send email:", err)

		js, err = json.Marshal(response{
			Type:    "error",
			Message: "Oops! We broke it. Please try again later. ~ send error",
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else {
		js, err = json.Marshal(response{
			Type:    "ok",
			Message: "Thanks Got It! I'll be in touch soon.",
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	_, err = w.Write(js)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
