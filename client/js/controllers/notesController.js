(function() {
  angular.module('noteApp')
    .controller('notesController', function($scope, $location, notesFactory, $location, $state) {

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
        $state.reload();
        return notesFactory.create(note.title, note.content);
      }

      $scope.toggleCreate = () => {
        $scope.createNote = !$scope.createNote;
      }

      $scope.preview = () => {
        $scope.notePreview = true;
      };

      $scope.readMore = (note) => {
        $scope.reading = true;
        $scope.read = {
          title: note.title,
          content: note.content,
          _id: note._id
        }
      }

      $scope.cancel = () => {
        $scope.reading = false;
      }

      $scope.toggleEdit = () => {
        $scope.edit = !$scope.edit;
      }

      $scope.save = (note) => {
        notesFactory.update(note.title, note.content, note._id);
        $scope.toggleEdit();
      }

      $scope.delete = (noteId) => {
        notesFactory.delete(noteId);
        $location.path('/notes');
      }

      $scope.addNote = () => {
        $scope.createNote = true;
      }


    })
}());