/**
 * Created by luying on 2017/9/25.
 */
export default class REP{
    static uploadFile(uri, token, formInput, callback) {
        return new Promise((resolve, reject) => {
            if (typeof uri != 'string' || uri == '' || typeof formInput.key == 'undefined') {
                reject && reject(null);
                return;
            }
            if (uri[0] == '/') {
                uri = "file://" + uri;
            }
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                // alert(xhr.readyState)
                switch (xhr.readyState) {
                    case 0:

                        break;
                    case 1:
                        console.log('正在提交')
                        break;
                    case 2:

                        break;
                    case 3:

                        break;
                    case 4:

                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                            // var data = xhr.responseText;
                            // var message = xhr.response;
                          callback(true)

                        } else {
                            callback(true)

                            if (xhr.status == 401) {

                            } else if (xhr.status == 614) {

                            }
                            // alert("Request was unsuccessful : " + xhr.status + " " + xhr.statusText);
                        }
                        break;
                }
            };
            xhr.open('POST', 'http://upload.qiniu.com');
            xhr.onload = () => {
                if (xhr.status !== 200) {
                    reject && reject(xhr);
                    return;
                }
                resolve && resolve(xhr);
            };

            var formdata = new FormData();
            formdata.append("key", formInput.key);
            formdata.append("token", token);
            if (typeof formInput.type == 'undefined')
                formInput.type = 'application/octet-stream';
            if (typeof formInput.name == 'undefined') {
                var filePath = uri.split("/");
                if (filePath.length > 0)
                    formInput.name = filePath[filePath.length - 1];
                else
                    formInput.name = "";
            }
            formdata.append("file", { uri: uri, type: formInput.type, name: formInput.name });
            // xhr.upload.onprogress = (event) => {
            //   onprogress && onprogress(event, xhr);
            // };
            xhr.send(formdata);
        });
    }
}

