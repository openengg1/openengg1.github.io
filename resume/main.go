package main

import (
	"io/ioutil"
	"log"
	"os"
	"os/exec"

	"github.com/acrlakshman/profileio-resume/profileio"
)

func main() {
	jsonData, err := ioutil.ReadFile("./profile_resume.json")
	if err != nil {
		log.Fatalf("Error reading profile_resume.json: %v", err)
	}
	profileio.ProfileIO(jsonData)

	// The following code attempts to compile the resume using pdflatex/xelatex.
	// This is already handled by the GitHub Actions workflow in later steps.
	// We are commenting it out to prevent the "basic.tmpl" file not found error,
	// as the core function of this Go program (creating the .tex file from json)
	// is already complete at this point.

	/*
		app := "xelatex"
		if !commandExists(app) {
			app = "pdflatex"
			if !commandExists(app) {
				log.Print("Cannot compile resume.tex")
				os.Exit(0) // Exit with this code to avoid github actions failure.
			}
		}

		os.Chdir("./resume")
		cmd := exec.Command(app, "resume.tex")
		_, err = cmd.Output()
		if err != nil {
			log.Printf("Error: could not process TeX file, %v", err)
		}
	*/
}

func commandExists(cmd string) bool {
	_, err := exec.LookPath(cmd)
	return err == nil
}
