package main

import (
	"encoding/json"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"log"
	"net/http"
	"os"
)

type emailData struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Message string `json:"message"`
	Captcha string `json:"recaptchaValue"`
}

type response struct {
	Type string
	Message string
}

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("ENV file not found.")
	}
}

func main() {
	r := httprouter.New()

	r.POST("/sendmail", sendMail)

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

	adminEmail, sEExists := os.LookupEnv("ADMIN_EMAIL")
	if !sEExists {
		log.Fatal("Cannot get Support email")
	}

	apiKey, kExists := os.LookupEnv("SENDGRID_API_KEY")
	if !kExists {
		log.Fatal("No api key for sendgrid")
	}

	to := mail.NewEmail("", adminEmail)
	from := mail.NewEmail("", data.Email)

	message := mail.NewSingleEmail(from, "incubo development inquiry", to, data.Message, data.Message)
	client := sendgrid.NewSendClient(apiKey)

	if res, err := client.Send(message); err != nil {
		fmt.Println("Failed to send email:", err)
		fmt.Println("CODE:", res.StatusCode)
		fmt.Println("BODY:", res.Body)
		fmt.Println("Headers:", res.Headers)

		_, err = w.Write([]byte("Something went wrong."))
		if err != nil {
		    http.Error(w, err.Error(), http.StatusInternalServerError)
		    return
		}
	} else {
		js, err := json.Marshal(response{
			Type:    "ok",
			Message: "Thanks Got It! I'll be in touch soon.",
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	}
}
