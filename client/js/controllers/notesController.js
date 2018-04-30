(function() {
  angular.module('noteApp')
    .controller('notesController', function($scope, $location, notesFactory, $location) {

      // get all notes
      notesFactory.getNotes().$promise.then(function(notes) {
        if (notes) {
          // set relative time using moment js
          notes.message.forEach(note => {
            note.time = moment(note.createdAt).fromNow();
          });
          $scope.notes = notes.message;
        }
      });

      // create notes
      $scope.create = (note) => {
        $scope.toggleCreate();
        $location.path('/notes');
        return notesFactory.create(note.title, note.content);
      }

      $scope.toggleCreate = () => {
        $scope.createNote = !$scope.createNote;
      }

      $scope.preview = () => {
        $scope.notePreview = true;
      };

    })
}());