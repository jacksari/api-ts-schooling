import fs from 'fs';

const deleteFile = (path: string) => {
    fs.unlink(path, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}

module.exports = {
    deleteFile
}