(function() {
  angular.module('noteApp')
    .factory('notesFactory', function($resource) {
      const token = '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9uaWNhaCIsImlhdCI6MTUyNTAxODA2NiwiZXhwIjoxNTI1MTA0NDY2fQ.xgmNr0CDHdiDy71eB0b9wIaFpiVzB-t7p0SZ8PFYuDc';
      const resource = $resource(`/api/notes/:note_id/${token}`, {
        note_id: '@_id'
      }, {
        update: { method: 'PUT' },
        delete: { method: 'DELETE' },
        save: { method: 'POST' }
      });

      return {
        create: (note) => {
          return resource.save(note);
        },
        getNotes: () => {
          return resource.get();
        },
        getNote: (noteId) => {
          return resource.get({ note_id: noteId });
        },
        update: (note, ) => {
          resource.update(note);
        },
        delete: (noteId) => {
          return resource.delete({ note_id: noteId });
        }
      }
    });
})();