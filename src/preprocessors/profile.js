const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// --- (Existing helper functions remain the same) ---
const processFilePath = (path_ = '') => {
  if (path_ !== '.' && path_ !== './') {
    if (path_.length && path_[0] === '/') return path_;

    if (path_.length > 2) {
      path_ = path_.substr(0, 2) === './' ? path_ : './' + path_;
    } else {
      throw new Error('Invalid file');
    }
  }

  return path_;
};

const getFilePath = (file_ = '') => {
  try {
    return path.resolve(__dirname, file_);
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param {string} filePath
 * @param {number} depth
 * @example
 * filePath = '/sample_root_path/project/src/preprocessor/profile.js'
 * depth = 2  for `project` as root folder
 * returns: '/sample_root_path/project/'
 * @returns {string} returns the root folder path appended by the seperator.
 */
const getRootFolderPath = (filePath, depth = 0) => {
  const pathArr = filePath.split(path.sep);
  return `${pathArr.slice(0, pathArr.length - depth - 1).join(path.sep)}${
    path.sep
  }`;
};

const appendToRootFolder = (filePath, depth = 0) => {
  return `${getRootFolderPath(__dirname, depth - 1)}${path.normalize(
    filePath
  )}`;
};

const getJSONFromYAML = (relativeFilePath, depth) => {
  const filePath = appendToRootFolder(relativeFilePath, depth);
  const jsonObj = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
  return jsonObj;
};

const isValidUrl = (url) => {
  return RegExp(
    '^(?:(?:(?:https?|ftp):)?//)(?:S+(?::S*)?@)?(?:(?!(?:10|127)(?:.d{1,3}){3})(?!(?:169.254|192.168)(?:.d{1,3}){2})(?!172.(?:1[6-9]|2d|3[0-1])(?:.d{1,3}){2})(?:[1-9]d?|1dd|2[01]d|22[0-3])(?:.(?:1?d{1,2}|2[0-4]d|25[0-5])){2}(?:.(?:[1-9]d?|1dd|2[0-4]d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff].)+(?:[a-z\u00a1-\uffff]{2,}.?))(?::d{2,5})?(?:[/?#]S*)?$'
  ).test(url);
};

const isValidFilePath = (filePath, ext = 'md') => {
  return RegExp(`^[a-zA-Z0-9-_${path.sep}.]+.${ext}$`).test(filePath);
};

const isValidSlug = (slug) => {
  return RegExp(`^[a-zA-Z0-9-_/]+$`).test(slug);
};

const processProfileSummary = (jsonObj) => {
  if (
    !jsonObj['basics'] ||
    !jsonObj['basics']['summary'] ||
    !jsonObj['basics']['summary']['value']
  ) {
    return jsonObj;
  }
  let summary = jsonObj['basics']['summary']['value'];

  if (isValidFilePath(summary)) {
    let fileAbs = appendToRootFolder(`_profile/${summary}`, 2);
    try {
      fs.accessSync(fileAbs, fs.constants.F_OK);
      summary = fs.readFileSync(fileAbs, 'utf8');
    } catch (err) {
      // continue with what is stored in jsonObj['basics']['summary']['value']
      summary = jsonObj['basics']['summary']['value'];
    }
  }
  jsonObj['basics']['summary']['value'] = summary;

  return jsonObj;
};

const processProjectsMarkdownFields = (jsonObj) => {
  if (!jsonObj['projects'] || !Array.isArray(jsonObj['projects']['list'])) {
    return jsonObj;
  }
  let list = jsonObj['projects']['list'];

  for (let i = 0; i < list.length; i++) {
    let item = jsonObj['projects']['list'][i];
    if (
      'webPage' in item['value'] &&
      !isValidUrl(
        item['value']['webPage']['slug'] &&
          isValidFilePath(item['value']['webPage']['detail'])
      )
    ) {
      let file_ = item['value']['webPage']['detail'];
      let fileAbs = appendToRootFolder(`_profile/${file_}`, 2);
      try {
        fs.accessSync(fileAbs, fs.constants.F_OK);
        jsonObj['projects']['list'][i]['value']['webPage'][
          'detail'
        ] = fs.readFileSync(fileAbs, 'utf8');
      } catch (err) {
        throw new Error(`${fileAbs} NOT found`);
      }
    }
  }

  return jsonObj;
};

const processPublicationsMarkdownFields = (jsonObj) => {
  if (
    !jsonObj['publications'] ||
    !Array.isArray(jsonObj['publications']['list'])
  ) {
    return jsonObj;
  }
  let list = jsonObj['publications']['list'];

  for (let i = 0; i < list.length; i++) {
    let item = jsonObj['publications']['list'][i];
    if (
      'webPage' in item['value'] &&
      !isValidUrl(item['value']['webPage']['slug']) &&
      isValidFilePath(item['value']['webPage']['detail'])
    ) {
      let file_ = item['value']['webPage']['detail'];
      let fileAbs = appendToRootFolder(`_profile/${file_}`, 2);
      try {
        fs.accessSync(fileAbs, fs.constants.F_OK);
        jsonObj['publications']['list'][i]['value']['webPage'][
          'detail'
        ] = fs.readFileSync(fileAbs, 'utf8');
      } catch (err) {
        throw new Error(`${fileAbs} NOT found`);
      }
    }
  }

  return jsonObj;
};

const processCustomSectionsMarkdownFields = (jsonObj) => {
  if (!jsonObj['custom'] || !Array.isArray(jsonObj['custom'])) {
    return jsonObj;
  }
  let list = jsonObj['custom'];

  for (let i = 0; i < list.length; i++) {
    if (
      'value' in jsonObj['custom'][i] &&
      isValidFilePath(jsonObj['custom'][i]['value'])
    ) {
      let fileAbs = appendToRootFolder(
        `_profile/${jsonObj['custom'][i]['value']}`,
        2
      );

      try {
        fs.accessSync(fileAbs, fs.constants.F_OK);
        jsonObj['custom'][i]['value'] = fs.readFileSync(fileAbs, 'utf8');
      } catch (err) {
        throw new Error(`${fileAbs} NOT found`);
      }
    }

    if ('webPage' in jsonObj['custom'][i]) {
      if (
        'detail' in jsonObj['custom'][i]['webPage'] &&
        isValidFilePath(jsonObj['custom'][i]['webPage']['detail'])
      ) {
        let fileAbs = appendToRootFolder(
          `_profile/${jsonObj['custom'][i]['webPage']['detail']}`,
          2
        );

        try {
          fs.accessSync(fileAbs, fs.constants.F_OK);
          jsonObj['custom'][i]['webPage']['detail'] = fs.readFileSync(
            fileAbs,
            'utf8'
          );
        } catch (err) {
          throw new Error(`${fileAbs} NOT found`);
        }
      }
    }
  }

  return jsonObj;
};

const processSlug = (jsonObj, section) => {
  if (!jsonObj[section]) {
    return jsonObj;
  }

  let list = {};
  if (section === 'custom') {
    if (!Array.isArray(jsonObj[section])) return jsonObj;
    list = jsonObj[section];
  } else {
    if (!Array.isArray(jsonObj[section]['list'])) return jsonObj;
    list = jsonObj[section]['list'];
  }

  for (let i = 0; i < list.length; i++) {
    let item = {};
    item = section === 'custom' ? list[i] : list[i]['value'];
    if (
      'webPage' in item &&
      'slug' in item['webPage'] &&
      !isValidUrl(item['webPage']['slug']) &&
      isValidSlug(item['webPage']['slug'])
    ) {
      if (!(section in jsonObj['slugMap'])) jsonObj['slugMap'][section] = {};

      const slug = item['webPage']['slug'];
      jsonObj['slugMap'][section] = Object.assign(jsonObj['slugMap'][section], {
        [slug]: { position: i },
      });
    }
  }

  return jsonObj;
};

const processMarkdownFieldsAndSlugs = (jsonObj) => {
	jsonObj['slugMap'] = {};

	for (const key in jsonObj) {
		if (key === 'basics') {
			jsonObj = processProfileSummary(jsonObj);
		}

		if (key === 'projects' && jsonObj[key] && jsonObj[key].list) {
			jsonObj = processProjectsMarkdownFields(jsonObj);
			jsonObj = processSlug(jsonObj, 'projects');
		}

		if (key === 'publications' && jsonObj[key] && jsonObj[key].list) {
			jsonObj = processPublicationsMarkdownFields(jsonObj);
			jsonObj = processSlug(jsonObj, 'publications');
		}

		if (key === 'custom' && jsonObj[key]) {
			jsonObj = processCustomSectionsMarkdownFields(jsonObj);
			jsonObj = processSlug(jsonObj, 'custom');
		}
	}

	return jsonObj;
};

// --- NEW: LaTeX Generation Logic ---

// Escapes special LaTeX characters
const escapeLatex = (s) => {
    if (typeof s !== 'string') return '';
    return s
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/&/g, '\\&')
        .replace(/%/g, '\\%')
        .replace(/\$/g, '\\$')
        .replace(/#/g, '\\#')
        .replace(/_/g, '\\_')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/\^/g, '\\textasciicircum{}');
};


// Generates the final .tex file content from the JSON data
const generateTexFromJSON = (data) => {
    const nameParts = data.basics.name.split(' ');
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ') || '';

    let tex = `
\\documentclass[11pt,a4paper,sans]{moderncv}
\\moderncvstyle{classic}
\\moderncvcolor{blue}
\\usepackage[utf8]{inputenc}
\\usepackage[scale=0.8]{geometry}

\\name{${escapeLatex(firstName)}}{${escapeLatex(lastName)}}
\\address{${escapeLatex(data.basics.address)}}{}
\\phone[mobile]{${escapeLatex(data.basics.phone)}}
\\email{${escapeLatex(data.basics.email)}}
\\homepage{${escapeLatex(data.basics.homepage)}}
`;

    if (data.basics.profiles) {
        data.basics.profiles.forEach(profile => {
            if (profile) {
                tex += `\\social[${profile.network}]{${escapeLatex(profile.user)}}\n`;
            }
        });
    }

    tex += `
\\begin{document}
\\makecvtitle

\\section{Profile}
${escapeLatex(data.basics.summary)}
`;

    if (data.skills && data.skills.list) {
        tex += `\n\\section{${escapeLatex(data.skills.label)}}\n`;
        data.skills.list.forEach(item => {
            if (item && item.value) {
                tex += `\\cvitem{}{${escapeLatex(item.value.name)}}\n`;
            }
        });
    }
    
    if (data.work) {
        tex += `\n\\section{Experience}\n`;
        data.work.forEach(item => {
            if (item && item.value) {
                tex += `\\cventry{${item.value.date}}{${escapeLatex(item.value.position)}}{${escapeLatex(item.value.company)}}{${escapeLatex(item.value.location)}}{}{
\\begin{itemize}
`;
                if (item.value.description) {
                    item.value.description.forEach(desc => {
                        tex += `\\item ${escapeLatex(desc)}\n`;
                    });
                }
                tex += `\\end{itemize}}\n`;
            }
        });
    }

    if (data.education && data.education.list) {
        tex += `\n\\section{${escapeLatex(data.education.label)}}\n`;
        data.education.list.forEach(item => {
            if (item && item.value) {
                tex += `\\cventry{${item.value.date}}{${escapeLatex(item.value.studyType)}}{${escapeLatex(item.value.institution)}}{${escapeLatex(item.value.location)}}{}{
\\begin{itemize}
`;
                if (item.value.description) {
                    item.value.description.forEach(desc => {
                        tex += `\\item ${escapeLatex(desc)}\n`;
                    });
                }
                tex += `\\end{itemize}}\n`;
            }
        });
    }
    
    if (data.publications && data.publications.list) {
        tex += `\n\\section{${escapeLatex(data.publications.label)}}\n`;
        data.publications.list.forEach(item => {
            if (item && item.value) {
                tex += `\\cvitem{${escapeLatex(item.value.id)}}{${escapeLatex(item.value.summary)}}\n`;
            }
        });
    }

    if (data.custom) {
        data.custom.forEach(section => {
            if (section && section.list) {
                tex += `\n\\section{${escapeLatex(section.label)}}\n`;
                section.list.forEach(item => {
                    if (item && item.value) {
                        tex += `\\cvitem{${escapeLatex(item.value.id)}}{${escapeLatex(item.value.summary)}}\n`;
                    }
                });
            }
        });
    }

    if (data.awards && data.awards.list) {
        tex += `\n\\section{${escapeLatex(data.awards.label)}}\n`;
        data.awards.list.forEach(item => {
            if (item && item.value) {
                tex += `\\cvitem{${item.value.date}}{${escapeLatex(item.value.summary)}}\n`;
            }
        });
    }

    tex += `
\\end{document}
`;
    return tex;
};


const processProfile = (relativeFilePath, depth, outFileRelativePath) => {
	let jsonObj = getJSONFromYAML(relativeFilePath, depth);
	const jsonFile = appendToRootFolder(outFileRelativePath, 2);

	// process markdown files
	jsonObj = processMarkdownFieldsAndSlugs(jsonObj);

	fs.writeFileSync(jsonFile, JSON.stringify(jsonObj));

    // If this is the resume file, also generate the .tex file
    if (path.basename(outFileRelativePath) === 'profile_resume.json') {
        const texContent = generateTexFromJSON(jsonObj);
        const texFile = appendToRootFolder('resume/resume.tex', 2);
        
        // Ensure the resume directory exists
        const resumeDir = path.dirname(texFile);
        if (!fs.existsSync(resumeDir)){
            fs.mkdirSync(resumeDir, { recursive: true });
        }

        fs.writeFileSync(texFile, texContent);
        console.log('resume.tex generated successfully.');
    }
};

processProfile(process.argv[2], 2, process.argv[3]);

