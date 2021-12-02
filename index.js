// 'rootDir' => diretorio raiz

const fs = require('fs').promises;// mode do proprio coração do 'node', ela é o nosso 'file system'
const path = require('path');// o 'path' é para tratarmos dos caminhos
 
// fs.readdir(path.resolve(__dirname))// função assincrona '.readdir' e função sincrona '.readdirSync'
// // fs.readdir('./') 'readdir' => ler diretorio
// .then(files => console.log(files))
//  .catch(e => console.log(e));

async function readdir(rootDir) {
    rootDir = rootDir || path.resolve(__dirname);
  const files = await fs.readdir(rootDir);
  walk(files, rootDir);
}

async function walk(files, rootDir) {
    for (let file of files) {
        const fileFullPath = path.resolve(rootDir, file);
        const stats = await fs.stat(fileFullPath);

        if(/\.git/g.test(fileFullPath)) continue;// expresao regular para encontrar ficheiros que terminam com '.git'
        if(/node_modules/g.test(fileFullPath)) continue;//expresao regular para encontrar pastas com o nome 'node_modules'
        
      
        if (stats.isDirectory()) {
            readdir(fileFullPath);
            continue;
        }

        if(!/\.css$/g.test(fileFullPath)) continue;
        // console.log(file, stats.isDirectory());
        // console.log(fileFullPath, stats.isDirectory());
        console.log(fileFullPath);
    }
}

// readdir();
// readdir('D:/Mona/Projetos-mona/node2');
readdir('D:/Mona/Projetos-mona');