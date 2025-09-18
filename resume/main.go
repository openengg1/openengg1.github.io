package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"strings"
	"text/template"
)

// --- Data Structures to match profile_resume.json ---

type Basics struct {
	Name     string `json:"name"`
	Address  string `json:"address"`
	Phone    string `json:"phone"`
	Email    string `json:"email"`
	Homepage string `json:"homepage"`
	Summary  struct {
		Value string `json:"value"`
	} `json:"summary"`
	Profiles []struct {
		Network string `json:"network"`
		User    string `json:"user"`
	} `json:"profiles"`
}

type Work struct {
	Label string `json:"label"`
	List  []struct {
		Value struct {
			Position    string   `json:"position"`
			Company     string   `json:"company"`
			Location    string   `json:"location"`
			Date        string   `json:"date"`
			Description []string `json:"description"`
		} `json:"value"`
	} `json:"list"`
}

type Education struct {
	Label string `json:"label"`
	List  []struct {
		Value struct {
			Institution string   `json:"institution"`
			Location    string   `json:"location"`
			Area        string   `json:"area"`
			StudyType   string   `json:"studyType"`
			Date        string   `json:"date"`
			Description []string `json:"description"`
		} `json:"value"`
	} `json:"list"`
}

type Publication struct {
	Label string `json:"label"`
	List  []struct {
		Value struct {
			ID      string `json:"id"`
			Name    string `json:"name"`
			Summary string `json:"summary"`
		} `json:"value"`
	} `json:"list"`
}

type Skill struct {
	Label string `json:"label"`
	List  []struct {
		Value struct {
			Name string `json:"name"`
		} `json:"value"`
	} `json:"list"`
}

type Award struct {
	Label string `json:"label"`
	List  []struct {
		Value struct {
			Date    string `json:"date"`
			Summary string `json:"summary"`
		} `json:"value"`
	} `json:"list"`
}

type CustomSection struct {
	Label string `json:"label"`
	List  []struct {
		Value struct {
			ID      string `json:"id"`
			Name    string `json:"name"`
			Summary string `json:"summary"`
		} `json:"value"`
	} `json:"list"`
}

type ProfileData struct {
	Basics        Basics          `json:"basics"`
	Work          Work            `json:"work"`
	Education     Education       `json:"education"`
	Publications  Publication     `json:"publications"`
	Skills        Skill           `json:"skills"`
	Awards        Award           `json:"awards"`
	Custom        []CustomSection `json:"custom"`
	Presentations CustomSection   `json:"presentations"`
}

// --- LaTeX Template ---

// Note: This is a simplified template based on moderncv.
// It may require adjustments for perfect formatting.
const texTemplate = `
\documentclass[11pt,a4paper,sans]{moderncv}
\moderncvstyle{classic}
\moderncvcolor{blue}
\usepackage[utf8]{inputenc}
\usepackage[scale=0.8]{geometry}

% Helper to escape LaTeX special characters
{{- define "escape" -}}
{{- $s := . -}}
{{- $s = strings.ReplaceAll $s "&" "\\&" -}}
{{- $s = strings.ReplaceAll $s "%" "\\%" -}}
{{- $s = strings.ReplaceAll $s "$" "\\$" -}}
{{- $s = strings.ReplaceAll $s "#" "\\#" -}}
{{- $s = strings.ReplaceAll $s "_" "\\_" -}}
{{- $s = strings.ReplaceAll $s "{" "\\{" -}}
{{- $s = strings.ReplaceAll $s "}" "\\}" -}}
{{- $s = strings.ReplaceAll $s "~" "\\textasciitilde{}" -}}
{{- $s = strings.ReplaceAll $s "^" "\\textasciicircum{}" -}}
{{- $s = strings.ReplaceAll $s "\\" "\\textbackslash{}" -}}
{{- $s -}}
{{- end -}}

\name{ {
   {
   .Basics.FirstName}} }{ {
   {.Basics.LastName}} }
\address{ {
   {
   .Basics.Address}} }{}
\phone[mobile]{ {
   {
   .Basics.Phone}} }
\email{ {
   {
   .Basics.Email}} }
\homepage{ {
   {
   .Basics.Homepage}} }
{{range .Basics.Profiles}}
\social[{{.Network}}]{ {
   {
   .User}} }
{{end}}

\begin{document}
\makecvtitle

\section{ {
   {
   .Basics.Summary.Label | template "escape"}} }
{ {
   .Basics.Summary.Value | template "escape"}}

\section{ {
   {
   .Skills.Label | template "escape"}} }
{{range .Skills.List}}
\cvitem{}{ {
   {.Value.Name | template "escape"}} }
{{end}}

\section{ {
   {
   .Work.Label | template "escape"}} }
{{range .Work.List}}
\cventry{ {
   {.Value.Date}} }{ {
   {.Value.Position | template "escape"}} }{ {
   {.Value.Company | template "escape"}} }{ {
   {.Value.Location | template "escape"}} }{}
{
\begin{itemize}
{{range .Value.Description}}
\item { {
   . | template "escape"}}
{{end}}
\end{itemize}
}
{{end}}

\section{ {
   {
   .Education.Label | template "escape"}} }
{{range .Education.List}}
\cventry{ {
   {.Value.Date}} }{ {
   {.Value.StudyType | template "escape"}} }{ {
   {.Value.Institution | template "escape"}} }{ {
   {.Value.Location | template "escape"}} }{}
{
\begin{itemize}
{{range .Value.Description}}
\item { {
   . | template "escape"}}
{{end}}
\end{itemize}
}
{{end}}

\section{ {
   {
   .Publications.Label | template "escape"}} }
{{range .Publications.List}}
\cvitem{ {
   {.Value.ID | template "escape"}} }{ {
   {.Value.Summary | template "escape"}} }
{{end}}

\section{ {
   {
   .Presentations.Label | template "escape"}} }
{{range .Presentations.List}}
\cvitem{ {
   {.Value.ID | template "escape"}} }{ {
   {.Value.Summary | template "escape"}} }
{{end}}

{{range .Custom}}
\section{ {
   {
   .Label | template "escape"}} }
{{range .List}}
\cvitem{ {
   {.Value.ID | template "escape"}} }{ {
   {.Value.Summary | template "escape"}} }
{{end}}
{{end}}

\section{ {
   {
   .Awards.Label | template "escape"}} }
{{range .Awards.List}}
\cvitem{ {
   {.Value.Date}} }{ {
   {.Value.Summary | template "escape"}} }
{{end}}

\end{document}
`

// --- Main Program ---

func main() {
	// Read the JSON file created by the node script
	jsonData, err := ioutil.ReadFile("./profile_resume.json")
	if err != nil {
		log.Fatalf("Error reading profile_resume.json: %v", err)
	}

	// Unmarshal JSON into our Go structs
	var data ProfileData
	if err := json.Unmarshal(jsonData, &data); err != nil {
		log.Fatalf("Error unmarshalling JSON: %v", err)
	}

	// Helper functions for the template
	funcMap := template.FuncMap{
		"escape": func(s string) string {
			s = strings.ReplaceAll(s, "&", "\\&")
			s = strings.ReplaceAll(s, "%", "\\%")
			s = strings.ReplaceAll(s, "$", "\\$")
			s = strings.ReplaceAll(s, "#", "\\#")
			s = strings.ReplaceAll(s, "_", "\\_")
			s = strings.ReplaceAll(s, "{", "\\{")
			s = strings.ReplaceAll(s, "}", "\\}")
			return s
		},
	}

	// Split name into first and last for the template
	nameParts := strings.Fields(data.Basics.Name)
	firstName := ""
	lastName := ""
	if len(nameParts) > 0 {
		firstName = nameParts[0]
	}
	if len(nameParts) > 1 {
		lastName = strings.Join(nameParts[1:], " ")
	}

	// Create a temporary struct to hold all data for the template
	templateData := struct {
		ProfileData
		FirstName string
		LastName  string
	}{
		ProfileData: data,
		FirstName:   firstName,
		LastName:    lastName,
	}

	// Create a new template and parse the template string
	tmpl, err := template.New("resume").Funcs(funcMap).Parse(texTemplate)
	if err != nil {
		log.Fatalf("Error parsing template: %v", err)
	}

	// Create the output .tex file
	outputFile, err := os.Create("./resume.tex")
	if err != nil {
		log.Fatalf("Error creating resume.tex: %v", err)
	}
	defer outputFile.Close()

	// Execute the template with the data and write to the file
	if err := tmpl.Execute(outputFile, templateData); err != nil {
		log.Fatalf("Error executing template: %v", err)
	}

	log.Println("resume.tex created successfully.")
}

