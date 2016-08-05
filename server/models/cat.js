module.exports = function(Cat) {
  Cat.breeds = function(cb) {
    //This would probably not be hard coded.
    var breeds = ["American Shorthair","Abyssinian","American Curl","American Wirehair","Bengal","Chartreux","Devon Rex","Maine Coon","Manx","Persian","Siamese"];
    cb(null,breeds);
  };

  Cat.remoteMethod('breeds', {
    http: {verb: 'get', path: '/breeds'},
    returns: {root: true, type: 'array'}
  });
};
