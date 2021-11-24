var Api = {}
Api.rootUrl = ""
Api.domain  = ""
Api.header  = {}


Api.VerifyToken = function(fx){
  $.ajax({
    url: Api.domain + "/api/v1/accounts/verify_credentials",
    type: "GET", 
    headers: Api.header,  
    success: fx,
  })
}

Api.AppInit = function(fx){
  $.post(Api.domain + '/api/v1/apps', 
  {
    client_name: "AccountPortal", 
    redirect_uris: "URN:Ietf:wg:oauth:2.0:oob"
  }, 
  fx 
  ); 
}

Api.LoginURL = function(id){
  return Api.domain + '/oauth/authorize' +
    '?client_id=' + id +
    '&scope=read+write' +
    '&redirect_uri=' + Api.rootUrl +
    '&response_type=code'
}

Api.GetToken = function(id, st, code, fx){
  $.post(Api.domain + "/oauth/token", 
  {
    client_id: id,
    client_secret: st,
    redirect_uri: Api.rootUrl,
    grant_type: 'authorization_code', 
    code: code, 
    scope: 'read write'
  },
  fx )
}

Api.PasswordChange = function(oldpass, newpass, fx){
  $.ajax({
    url: Api.domain + "/api/v1/user/password_change",
    type: "POST", 
    headers: Api.header, 
    data: { old_password: oldpass, new_password: newpass },
    success: fx
  }); 
}

Api.PostStatus = function(text, vis, fx){
  $.ajax({
    url: Api.domain + "/api/v1/statuses",
    type: "POST", 
    headers: Api.header,
    data: { status: text, visibility: vis, format: "markdown" },
    success: fx
  }); 
}
