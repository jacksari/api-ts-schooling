import { uid } from 'uid';
const filePath = (fileImage: File, category: string, file: File) => {
    const myFileImage = fileImage.name.split('.');
    const fileTypeImage = myFileImage[myFileImage.length - 1];

    //let nameFileImage = `${myFileImage[0]}-${uuidv4()}.${fileTypeImage}`;
    const nameFileImage = `${uid()}.${fileTypeImage}`;
    const pathFileImage = (`./src/public/${file}/${category}/` + nameFileImage)

    return pathFileImage;
}


module.exports = {
    filePath
}