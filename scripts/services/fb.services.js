'use strict';

/**
 * @ngdoc service
 * @name urpgtoolsApp.characters
 * @description
 * # characters
 * Factory in the urpgtoolsApp.
 */
angular.module('FB.services' ,[])
    .factory('userCharacters', ['simpleLogin','fbutil', function(simpleLogin,fbutil) {
        var userCharacters = {
            getAllByUser : function(user){
                var qURL = 'users/'+user.uid+'/characters';
                return fbutil.syncArray(qURL);
            },
            getByCharacterId: function(user,cid){
                var qURL= 'users/'+user.uid+'/characters/'+cid;
                return fbutil.syncObject(qURL);
            },
            getCharacterTraits: function(user,cid){
                var qURL= 'users/'+user.uid+'/characters/'+cid+'/traits';
                return fbutil.syncArray(qURL);
            }
        }
        return userCharacters;
    }]);

