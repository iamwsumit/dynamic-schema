function hideAlert() {
    document.getElementById("alert").style.display = "none";
}

function showError(error) {
    let d = document.getElementById("alert");
    d.style.display = "flex";
    d.className = "error";
    let message = document.getElementById("message");
    message.innerText = error;
    document.getElementById("icon").className = "fa fa-times-circle";
}

function disableButton() {
    let button = document.getElementById('submit');
    button.innerText = "Generating Schema...";
    button.disabled = true;
    button.style.backgroundColor = '#275dfe65';
}

function enableButton(text) {
    let button = document.getElementById('submit');
    button.innerText = text;
    button.disabled = false;
    button.style.backgroundColor = '#275EFE';
}

function buildColor(colorCode) {
  var alpha = parseInt(androidColor.substr(1, 2), 16);
  var red = parseInt(androidColor.substr(3, 2), 16);
  var green = parseInt(androidColor.substr(5, 2), 16);
  var blue = parseInt(androidColor.substr(7, 2), 16);
  
  // Combine the color components into a single integer value
  var intValue = (alpha << 24) | (red << 16) | (green << 8) | blue;
  
  return intValue;
}

var KEYS = [];
var EXTENSIONS = {};

function rearrangeJson(componentJson) {
    const keys = Object.keys(componentJson);
    const json = JSON.parse(JSON.stringify(componentJson));
    const finalJson = {};
    const properties = {};
    const COMPS = [];

    keys.forEach((key) => {
        if (key === 'Uuid' || key === '$Version') {
            // nothing
        } else if (key === '$Name') {
            finalJson['id'] = json[key] + '{id}';
        } else if (key === '$Type') {
            let value = json[key];
            if (EXTENSIONS.hasOwnProperty(value)) {
                value = EXTENSIONS[value];
            }
            finalJson['type'] = value;
        } else if (key === '$Components') {
            const array = json[key];
            array.forEach((comp) => {
                let json = rearrangeJson(comp);
                COMPS.push(json);
            });
        } else {
            let value = json[key];
            const len = value.length;
            if (len >= 3) {
                if (value[0] === '{' && value[len - 1] === '}') {
                    KEYS.push(value.substring(1, len - 1));
                }
                if (value.substring(0, 3) === '&HF') {
                    value = buildColor(value);
                }
            }
            if (!isNaN(value)) {
                value = parseFloat(value);
            } else if (value === 'False') {
                value = false;
            } else if (value === 'True') {
                value = true;
            }
            properties[key] = value;
        }
    });

    finalJson['properties'] = properties;
    if (COMPS.length !== 0) {
        finalJson['components'] = COMPS;
    }
    return finalJson;
}

function onSubmit() {
    var file = document.getElementById("upload-file").files[0];
    if (file === undefined){
        showError('Please select an AIA file');
        return;
    }
    if (!file.name.endsWith('.aia')) {
        showError('Please select an AIA file');
        return;
    }
    var screenName = document.getElementById("form").value;
    var author = document.getElementById("author").value;
    document.getElementById("wrapper").style.display = 'none';

    if (file === undefined) {
        showError('Please upload an aia file')
    } else if (screenName.length < 1) {
        showError('Please enter the screen name');
    } else {
        hideAlert();
        disableButton();
        try {

            let SCREENS = [];

            JSZip.loadAsync(file).then(async function (contents) {
                const files = Object.entries(contents.files);
                let SCM = '';
                for (const [fileName, file] of files) {
                    if (fileName.endsWith('.scm')) {
                        const currentName = fileName.substr(fileName.lastIndexOf('/') + 1);
                        SCREENS.push(currentName.replace('.scm', ''));
                        if (fileName.startsWith('src/') && fileName.endsWith(screenName + '.scm')) {
                            SCM = await file.async("text");
                            const jsonWithoutDelimiters = SCM.replace('#|', '').replace('|#', '').replace('$JSON', '');

                            // Parse the JSON
                            SCM = JSON.parse(jsonWithoutDelimiters);

                        }
                    }
                    if (fileName.endsWith('components.json') && fileName.startsWith('assets/external_comps/')) {
                        const fileData = await file.async("text");
                        const info = JSON.parse(fileData);
                        EXTENSIONS[info[0].name] = info[0].type;
                    }
                }

                console.log(SCREENS);
                console.log(EXTENSIONS);

                if (SCM == '') {
                    showError("Given screen not found");
                    return;
                } else {
                    const template = {
                        name: 'Generated Templated',
                        'metadata-version': 1,
                        author: author,
                        platforms: ['App Inventor', 'Kodular', 'Niotron'],
                        extensions: EXTENSIONS,
                        keys: [],
                        components: [],
                    };

                    KEYS.push('id');

                    // generating schema

                    let cj = SCM.Properties['$Components'];
                    var COMPONENTS = [];
                    for (const key of cj) {
                        COMPONENTS.push(rearrangeJson(key));
                    }

                    template['extensions'] = EXTENSIONS;
                    template['keys'] = KEYS;
                    template['components'] = COMPONENTS;


                    document.getElementById("form").value = '';
                    document.getElementById("upload-file").value = '';
                    document.getElementById("wrapper").style.display = 'block';
                    document.getElementById("beautified").innerHTML = JSON.stringify(template, undefined, 2);
                    showSuccess("Schema Generated Successfully");

                }

            });

        } catch (error) {
            showError('Something went wrong');
            console.error(error);
        }

        enableButton("Generate Schema");
    }
}

function showSuccess(text) {
    let d = document.getElementById("alert");
    d.style.display = "flex";
    d.className = "success";
    let message = document.getElementById("message");
    message.innerText = text;
    document.getElementById("icon").className = "fa fa-check";
}
