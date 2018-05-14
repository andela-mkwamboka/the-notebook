(function() {
  angular.module('noteApp')
    .factory('notesFactory', function($resource, $localStorage) {
      const user_id = $localStorage.currentUser.user._id;

      return {
        create: (title, content) => {
          const resource = $resource(`/api/notes/${user_id}/`, null, { save: { method: 'POST' } });
          return resource.save({ title: title, content: content }).$promise
            .then((response) => {
              return response;
            });
        },
        getNotes: () => {
          const getAll = $resource('/api/users/:user_id/notes', {
            user_id: '@user_id'
          });
          return getAll.get({ user_id: user_id });
        },
        update: (title, content, note_id) => {
          const resource = $resource(`/api/notes/${user_id}/`, null, { update: { method: 'PUT' } });
          return resource.update({ title: title, content: content, note_id: note_id }).$promise
            .then((response) => {
              return response;
            });
        },
        delete: (note_id) => {
          const resource = $resource(`/api/notes/${user_id}/${note_id}`, { delete: { method: 'DELETE' } });
          return resource.delete()
            .$promise
            .then((response) => {
              return response;
            });
        }
      };
    });
})();