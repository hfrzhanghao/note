/*验证权限*/
if (document.cookie.indexOf("username") != -1 && document.cookie.indexOf("password") != -1) {
    var username = document.cookie.split(";")[0].split("=")[1]
    var password = document.cookie.split(";")[1].split("=")[1]
    var userInfo = {
        username: username,
        password: password
    }
    $.ajax({
        url: 'server/login.php',
        type: 'post',
        data: userInfo,
        datatype: 'json',
        success: function(data) {
            if (data['success'] == 'none') {
                window.location = "login.html"
            } else {
                tokenV.token = data['success']
            }
        }
    });
} else {
    window.location = "login.html";
}

/*token*/
var tokenV = new Vue({
    el: "#token",
    data: {
        token: ""
    }
})

/*头部*/
var nav = new Vue({
    el: "#header",
    data: {
        username: ""
    },
    methods: {
        exit: function() {
            setCookie(username, "", -1);
            setCookie(password, "", -1);
            window.location = "login.html";
        }
    }

})

//-------------------------------笔记本栏部分----------------------------------
var notebook = new Vue({
    el: "#notebook",
    //页面加载时载入笔记本列表
    mounted: function() {
        getRequest("server/getNotebook.php", { userid: 1 })
            .then((message) => {
                this.notebooks = (message == null ? [] : message)
            })
            .catch((message) => {
                console.log(message)
            });
    },
    data: {
        currentNotebook: "", //当前选中的笔记本
        currentHoverNotebookId: "", //鼠标悬停的笔记本
        notebooks: [], //笔记本列表
        show: true, //正常笔记本列表显示状态
        del_show: false //已删除笔记本列表显示状态
    },
    methods: {
        //当前鼠标悬停的笔记本，用于前端显示
        setCurrentHoverNotebookId: function(notebook) {
            this.currentHoverNotebookId = notebook.id
        },
        //鼠标离开，用于前端显示
        cancelHoverNotebook: function() {
            this.currentHoverNotebookId = ""
        },
        //获取笔记列表
        getNotes: function(notebook) {
            getRequest("server/getNotes.php", { notebook_belong: notebook.id })
                .then((message) => {

                    this.currentNotebook = notebook.id

                    note.notetitles = (message == null ? [] : message)
                })
                .catch((message) => {
                    console.log(message)
                })
        },
        //改变笔记本状态
        stateNotebook: function(notebook, state) {
            //要发送的数据，参数包括：要改变状态的笔记id，状态值，当前token
            var notebookState = {
                id: notebook.id,
                state: state,
                token: tokenV.token
            }
            //发送
            postRequest("server/updateNotebookState.php", notebookState)
                .then((message) => {
                    if (message.code == 0) {
                        //改变token
                        tokenV.token = message.token
                        //改变笔记状态，用于前端列表显示
                        notebook.state = state
                        //如果当前该笔记本处于选中状态
                        if (notebook.id == this.currentNotebook) {
                            //如果某个笔记处于待删除笔记本中，且处于选中状态，那么将当前选中笔记变量置空，对应的正文也置空
                            if (note.currentNote != "") {
                                note.notetitles.forEach(function(item, index) {
                                    if (item.id == note.currentNote) {
                                        note.currentNote = ""
                                        editor.txt.html('<p><br></p>')
                                    }
                                })
                            }
                            //将笔记列表也清空
                            note.notetitles.splice(0, note.notetitles.length)
                            //当前选中笔记本置空
                            this.currentNotebook = ""
                        }
                        //列表中删除的笔记本产生效果
                        $(".del-notebook").addClass('animated shake')
                        setTimeout(function() {
                            $(".del-notebook").removeClass('animated shake')
                        }, 400)
                    }

                })
                .catch((message) => {
                    console.log(message)
                })
        },
        showHideDeleteNotebook: function() {
            this.show = !this.show
            this.del_show = !this.del_show
        }
    }
})

//-------------------------------笔记栏部分----------------------------------
var note = new Vue({
    el: "#note-title",
    data: {
        currentNote: "", //当前已选中的笔记
        currentHoverNoteId: "", //当前鼠标悬停笔记
        notetitles: [], //笔记列表
        show: true, //正常笔记的显示状态
        del_show: false //已删除笔记的显示状态
    },
    methods: {
        //当前鼠标悬停的笔记，用于前端显示
        setCurrentHoverNoteId: function(note) {
            this.currentHoverNoteId = note.id
        },
        //鼠标离开，用于前端显示
        cancelHoverNote: function() {
            this.currentHoverNoteId = ""
        },

        //获取正文
        getArticle: function(note) {
            //发送get请求，参数：笔记id
            getRequest("server/getArticle.php", { id: note.id })
                .then((message) => {
                    if (message.code == 0) {
                        //当前选中的笔记，用于前端显示
                        this.currentNote = note.id

                        //message.article = message.article + ">"

                        //将得到的正文信息赋值给articleV
                        articleV.article = message

                        //显示正文
                        articleV.displayArticle()
                    }
                })
                .catch((message) => {
                    console.log(message)
                });
        },

        //改变笔记状态
        stateNote: function(note, state) {

            //要发送的数据，参数包括：要改变状态的笔记id，状态值，当前token
            var noteState = {
                id: note.id,
                state: state,
                token: tokenV.token
            }

            //发送
            postRequest("server/updateNoteState.php", noteState)
                .then((message) => {
                    if (message.code == 0) {
                        //改变token
                        tokenV.token = message.token
                        //改变笔记状态，用于前端列表显示
                        note.state = state
                        //如果当前该笔记处于选中状态，那么将正文部分也清空
                        if (note.id == this.currentNote) {
                            editor.txt.html('<p><br></p>')
                            this.currentNote = ""
                        }
                        //列表中删除的笔记产生效果
                        $(".del-note").addClass('animated shake')
                        setTimeout(function() {
                            $(".del-note").removeClass('animated shake')
                        }, 400)
                    }
                })
                .catch((message) => {
                    console.log(message)
                })
        },
        //显示或隐藏已删除笔记列表
        showHideDeleteNote: function() {
            this.show = !this.show
            this.del_show = !this.del_show
        }

    }
})

//-------------------------------正文部分----------------------------------
var articleV = new Vue({
    el: "#note-detail",
    data: {
        article: {
            id: "",
            article: "",
            date: ""
        }
    },
    mounted: function() {
        var self = this;
        // 创建编辑器
        editor = new wangEditor('editor');
        editor.config.uploadImgShowBase64 = true
        //editor.config.uploadImgServer = 'server/upload.php';
        //editor.config.uploadImgFileName = 'myFileName'
        editor.onchange = function() {
            // onchange 事件中更新数据
            self.article = editor.$txt.html();
        };
        editor.create();
    },
    methods: {
        //展示正文
        displayArticle: function() {
            editor.$txt.html(this.article.article)
        },

        //提交正文
        submit: function() {
            //未选中笔记，则不允许提交
            if (note.currentNote == "") {
                //此处无法使用数据驱动方式控制弹出框的显示与隐藏，原因未知=.=
                $('#warning-tip').show()
                setTimeout(function() {
                    $('#warning-tip').hide()
                }, 2000)
                return false
            }

            //发送数据，包括：当前token，要提交的笔记id，正文
            postRequest("server/updateNoteArticle.php", {
                    token: tokenV.token,
                    id: note.currentNote,
                    article: editor.$txt.html()
                })
                .then((message) => {
                    if (message.code == 0) {
                        //改变token
                        tokenV.token = message.token

                        //此处无法使用数据驱动方式控制弹出框的显示与隐藏，原因未知=.=
                        $('#success-tip').show()
                        setTimeout(function() {
                            $('#success-tip').hide()
                        }, 2000)
                    }
                })
                .catch((message) => {
                    console.log(message)
                })
        },

        //点击正文编辑区，如果事先未选中要修改的笔记，则不允许操作
        checkNoteSelected: function() {
            if (note.currentNote == "") {
                $("#selNoteTip").modal({ show: true })
            }
        }
    }
})

//-------------------------------插入笔记本的模态框----------------------------------
var newNotebook = new Vue({
    el: "#new-notebook-modal",
    data: {
        notebook: {
            name: "",
            des: ""
        }
    },
    methods: {
        //添加笔记本
        addNotebook: function() {
            //笔记本名称框不能为空
            if (this.notebook.name == "") {
                $('#notebook-name').addClass('animated shake')
                setTimeout(function() {
                    $('#notebook-name').removeClass('animated shake')
                }, 1000)
                return false
            }

            //发送的数据：当前token，笔记本名称，笔记本创建时间
            var jsonNotebook = {
                token: tokenV.token,
                name: this.notebook.name,
                date: Date.parse(new Date()),
                state: 0 //此处并不用于提交给数据库，而是为了能够在页面列表中显示而设的标记
            }

            //发送
            postRequest("server/insert.php", jsonNotebook)
                .then((message) => {
                    if (message[0].code == 0) {
                        //笔记本栏添加笔记本
                        notebook.notebooks.unshift(jsonNotebook)

                        //获取新插入的笔记本id，改变token
                        jsonNotebook.id = message[0].newid
                        tokenV.token = message[0].token

                        //模态框隐藏
                        $('#new-notebook-modal').modal('hide')
                    }
                })
                .catch((message) => {
                    console.log(message)
                })
        }
    }
})

//-------------------------------插入笔记的模态框------------------------------------
var newNote = new Vue({
    el: "#new-note-modal",
    data: {
        note: {
            name: "",
            des: "",
            selected: false
        },
        state: ""
    },
    methods: {
        //添加笔记
        addNote: function() {
            //添加时未选中笔记本
            if (this.note.name == "") {
                $('#note-name').addClass('animated shake')
                setTimeout(function() {
                    $('#note-name').removeClass('animated shake')
                }, 1000)
                return false
            }

            //笔记名称框不能为空
            if (this.note.name == "") {
                this.state = "笔记名称不能为空哦"
                return false
            }

            //发送的数据：当前token，笔记名称，笔记创建时间，笔记本归属id
            var jsonNote = {
                token: tokenV.token,
                name: this.note.name,
                date: Date.parse(new Date()),
                notebook_id: notebook.$data.currentNotebook,
                state: 0 //此处并不用于提交给数据库，而是为了能够在页面列表中显示而设的标记
            }

            //发送
            postRequest("server/insertNote.php", jsonNote)
                .then((message) => {
                    if (message[0].code == 0) {
                        //获取新插入笔记的id，改变token
                        jsonNote.id = message[0].newid
                        tokenV.token = message[0].token

                        //模态框隐藏
                        $('#new-note-modal').modal('hide')

                        //列表里添加新插入的笔记
                        note.notetitles.unshift(jsonNote)
                    }
                })
                .catch((message) => {
                    console.log(message)
                })
        }
    },
    computed: {
        //该属性决定“提交”按钮是否出现，只有在已经选中笔记本的情况下出现
        notebook_selected: function() {
            if (notebook.currentNotebook == "") {
                this.selected = false
            } else {
                this.selected = true
            }
            return this.selected
        }
    }
})

function postRequest(url, params) {
    return new Promise((resolve, reject) => {
        Vue.http.post(
                url, params, { emulateJSON: true }
            )
            .then((res) => {
                resolve(res.body);
            })
            .catch((res) => {
                reject(res.body);
            })
    })
}

function getRequest(url, params) {
    return new Promise((resolve, reject) => {
        Vue.http.get(
                url, {
                    params: params
                }, { emulateJSON: true }
            )
            .then((res) => {
                resolve(res.body);
            })
            .catch((res) => {
                reject(res.body);
            })
    })
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}