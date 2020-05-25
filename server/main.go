package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"log"
	"net/http"
	"os"
)

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

func sendMail(w http.ResponseWriter, _ *http.Request, p httprouter.Params) {
	toEmail := p.ByName("email")
	text := p.ByName("message")

	adminEmail, sEExists := os.LookupEnv("ADMIN_EMAIL")
	if !sEExists {
		log.Fatal("Cannot get Support email")
	}

	apiKey, kExists := os.LookupEnv("SENDGRID_API_KEY")
	if !kExists {
		log.Fatal("No api key for sendgrid")
	}

	to := mail.NewEmail("", toEmail)
	from := mail.NewEmail("Go Starter", adminEmail)

	message := mail.NewSingleEmail(from, "incubo development inquiry", to, text, text)
	client := sendgrid.NewSendClient(apiKey)

	if res, err := client.Send(message); err != nil {
		fmt.Println("Failed to send email:", err)
		fmt.Println("CODE:", res.StatusCode)
		fmt.Println("BODY:", res.Body)
		fmt.Println("Headers:", res.Headers)

		_, err := w.Write([]byte("Thanks Got It! I'll be in touch soon."))
		if err != nil {
		    http.Error(w, err.Error(), http.StatusInternalServerError)
		    return
		}
	}

	_, err := w.Write([]byte("Something went wrong."))
	if err != nil {
	    http.Error(w, err.Error(), http.StatusInternalServerError)
	    return
	}
}
