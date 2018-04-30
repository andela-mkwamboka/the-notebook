(function() {
  angular.module('noteApp')
    .factory('notesFactory', function($resource, $window) {
      const token = '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9uaWNhaCIsImlhdCI6MTUyNTA2Mjk3OCwiZXhwIjoxNTI1MTQ5Mzc4fQ.G5-4hInnEpi6GP86tMojdudi_MLgHi1acMzdFWImyTc';
      const user_id = $window.localStorage.getItem('user_id');
      // console.log(user_id)
      // const resource = $resource(`/api/notes/:note_id/${token}`, {
      //   note_id: '@_id'
      // }, {
      //   update: { method: 'PUT' },
      //   delete: { method: 'DELETE' },
      // }); 

      return {
        create: (title, content) => {
          const resource = $resource(`/api/notes/${user_id}/${token}`, null, { save: { method: 'POST' } })
          return resource.save({ title: title, content: content }).$promise
            .then((result) => {
              console.log(result)
            });
        },
        getNotes: () => {
          const getAll = $resource(`/api/users/:user_id/notes${token}`, {
            user_id: '@user_id'
          })
          return getAll.get({ user_id: user_id });
        },
        getNote: (note) => {
          return resource.get({ note_id: note._id });
        },
        update: (title, content, note_id) => {
          const userId = user_id
          console.log('------------------------------------');
          console.log(user_id);
          console.log('------------------------------------');
          const resource = $resource(`/api/notes/${user_id}/${token}`, null, { update: { method: 'PUT' } })
          return resource.update({ title: title, content: content, note_id: note_id }).$promise
            .then((result) => {
              console.log(result)
            });
          resource.update({ title: title, content: content, note_id: note_id });
        },
        delete: (note_id) => {
          return resource.delete({ note_id: note._id });
        }
      }
    });
})();