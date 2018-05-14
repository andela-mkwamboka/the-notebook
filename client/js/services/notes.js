(function() {
  angular.module('noteApp')
    .factory('notesFactory', function($resource, $localStorage) {
      const user_id = $localStorage.currentUser.user._id;
      const tokenId = $localStorage.currentUser.token;
      const token = `?token=${tokenId}`;

      return {
        create: (title, content) => {
          const resource = $resource(`/api/notes/${user_id}/${token}`, null, { save: { method: 'POST' } });
          return resource.save({ title: title, content: content });
        },
        getNotes: () => {
          const getAll = $resource(`/api/users/:user_id/notes${token}`, {
            user_id: '@user_id'
          });
          return getAll.get({ user_id: user_id });
        },
        update: (title, content, note_id) => {
          const resource = $resource(`/api/notes/${user_id}/${token}`, null, { update: { method: 'PUT' } });
          return resource.update({ title: title, content: content, note_id: note_id });
        },
        delete: (note_id) => {
          const resource = $resource(`/api/notes/${user_id}${token}`, null, { delete: { method: 'DELETE' } });
          return resource.delete({ note_id: note_id });
        }
      };
    });
})();