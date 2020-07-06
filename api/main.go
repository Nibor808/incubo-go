package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
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
	if err := godotenv.Load("./.env"); err != nil {
		log.Println("ENV file not found.")
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

	var data emailData
	err := decoder.Decode(&data)
	if err != nil {
		log.Fatalln(err)
	}

	devEmail, dEExists := os.LookupEnv("DEV_EMAIL")
	if !dEExists {
		log.Fatal("cannot get dev email")
	}

	apiKey, akExists := os.LookupEnv("SENDGRID_API_KEY")
	if !akExists {
		log.Fatal("No api key for sendgrid")
	}

	to := mail.NewEmail("", devEmail)
	from := mail.NewEmail("", devEmail)

	content := data.Name + ": " + data.Email + " - " + data.Message

	message := mail.NewSingleEmail(from, "incubo development inquiry", to, content, content)
	client := sendgrid.NewSendClient(apiKey)

	if res, err := client.Send(message); err != nil {
		log.Println("Failed to send email:", err)

		js, err := json.Marshal(response{
			Type:    "error",
			Message: "Failed to send email",
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_, err = w.Write(js)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else {
		var js []byte

		if res.StatusCode == 202 || res.StatusCode == 200 {
			log.Println("**Email Sent**")
			log.Println("CODE:", res.StatusCode)
			log.Println("BODY:", res.Body)

			js, err = json.Marshal(response{
				Type:    "ok",
				Message: "Thanks Got It! I'll be in touch soon.",
			})
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		} else {
			js, err = json.Marshal(response{
				Type:    "error",
				Message: "Failed to send email",
			})
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}

		w.Header().Set("Content-Type", "application/json")
		_, err = w.Write(js)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
