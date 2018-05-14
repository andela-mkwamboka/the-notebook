(function() {
  angular.module('noteApp')
    .controller('notesController', function($scope, $location, notesFactory, $state, $localStorage) {
      $scope.username = $localStorage.currentUser.user.username;
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

      $scope.toggleCreate = () => {
        $scope.createNote = !$scope.createNote;
      };

      $scope.create = (note) => {
        notesFactory.create(note.title, note.content).then((results) => {
          if (results) {
            $scope.success = 'Note created';
            $state.reload();
          }
        });
      };

      $scope.preview = () => {
        $scope.notePreview = true;
      };

      $scope.readMore = (note) => {
        $scope.reading = true;
        $scope.read = {
          title: note.title,
          content: note.content,
          _id: note._id
        };
      };

      $scope.cancel = () => {
        $scope.reading = false;
      };

      $scope.delete = (noteId) => {
        notesFactory.delete(noteId).then((result) => {
          if (result) {
            $state.reload();
          }
        });
      };

      $scope.toggleEdit = () => {
        $scope.edit = !$scope.edit;
      };

      $scope.save = (note) => {
        notesFactory.update(note.title, note.content, note._id);
        $scope.toggleEdit();
        $scope.cancel();
        $state.reload();
      };

    });
}());