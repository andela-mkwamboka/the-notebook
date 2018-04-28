(function() {
  angular.module('noteApp')
    .controller('notesController', function($scope, $state, notesFactory, $state) {

      // get all notes
      notesFactory.getNotes().$promise.then(function(notes) {
        // set relative time using moment js
        notes.message.forEach(note => {
          note.time = moment(note.createdAt).fromNow();
        });
        $scope.notes = notes.message;
      });

      // create notes
      $scope.create = (note) => {
        $scope.toggleCreate();
        $state.go('/notes');
        return notesFactory.create(note);
      }

      $scope.toggleCreate = () => {
        $scope.createNote = !$scope.createNote;
      }

      $scope.preview = () => {
        $scope.notePreview = true;
      };

    })
}());