/**
 * Created by Yana Tokareva on 24.10.2017.
 */

'use strict';


angular.module('sprintFrontendApp')
	.service('AuthService', ['$http', '$cookies', '$q', '$rootScope',
        function ($http, $cookies, $q) {
			this.registration = function(user){
				$http.post('http://localhost:9090/user/',user).then((data)=>{
                    if (data.data) {

                    } else {
                    	var x = 1245235;
                    }
				});
			};

			this.authenticate = function(name, password, remember) {
				if (!name || !password) {
					return $q.reject();
				}

				const headers = {
					authorization: "Basic " + btoa(name + ":" + password)
				};

				return $http.get('http://localhost:9090/login/user', {
					'headers': headers
				}).then((data) => {
					if (data.data) {
						if (remember) {
							createRememberMeCookie(data);
						}
					} else {
						return $q.reject();
					}
				});
			};

			this.getUserInfo = function() {
				return $http.get('http://localhost:9090/login/user', { withCredentials: true })
					.then(function(data) {
						if (data.data) {
							return data;
						} else {
							return $q.reject();
						}
					}).then((data) =>{
                        return $http.get('http://localhost:9090/user?UserName=' + data.data.name)
                            .then((userId) => {
                                return userId.data;
                            });
                    });
			};




			this.logout = function() {
				removeRememberMeCookie();
				return $http.post('http://localhost:9090/login/logout', {});
			};
			
			function createRememberMeCookie(userdetials) {
				let name = userdetials.data.principal.username;
				let pwd = userdetials.data.principal.password;
				let expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 30);

				let cookieValue = btoa(name
					+ ":"
					+ expireDate.getTime().toString()
					+ ":"
					+ md5(name
						+ ":"
						+ expireDate.getTime()
							.toString() + ":" + pwd
						+ ":"
						+ "DEVELNOTES_REMEMBER_TOKEN"));

				$cookies.put('DEVELNOTES_REMEMBER_ME_COOKIE',
					cookieValue, {
						'expires' : expireDate,
						'path' : '/'
					});
			}

			function removeRememberMeCookie() {
				let expireDate = new Date();
				expireDate.setDate(expireDate.getDate() - 1);
				$cookies.put('DEVELNOTES_REMEMBER_ME_COOKIE',
					'', {
						'expires' : expireDate,
						'path' : '/'
					});
			}
		}]);