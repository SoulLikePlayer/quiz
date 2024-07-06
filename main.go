package main

import (
    "net/http"
    "log"
    "encoding/json"
)

type Question struct {
    ID       int      `json:"id"`
    Question string   `json:"question"`
    Options  []string `json:"options"`
    Answer   int      `json:"answer"`
}

var questions = []Question{
    {ID: 1, Question: "What is the capital of France?", Options: []string{"Paris", "London", "Berlin", "Madrid"}, Answer: 0},
    {ID: 2, Question: "What is 2+2?", Options: []string{"3", "4", "5", "6"}, Answer: 1},
}

func main() {
    http.HandleFunc("/api/questions", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(questions)
    })

    log.Println("Starting server on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
