const fs = require('node:fs');
const process = require('node:process');

const args  = process.argv
const args1 = process.argv[2];
const args2 = process.argv[3];

// console.log("number of arguments is "+args.length);
// for (let i = 0; i < args.length; i++) {
//     console.log(`${i}: ${args[i]}`)
// }
const daftarList = `>>>> JS TODO <<<<
$ node daftar.js <command>
$ node daftar.js list
$ node daftar.js task <task_id>
$ node daftar.js add <task_content
$ node daftar.js delete <task_id>
$ node daftar.js complete <task_id>
$ node daftar.js uncompleted (ctask_id)
$ node daftar.js list:outstanding asc|desc
$ node daftar.js list:completed asc|desc
$ node daftar.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node daftar.js filter:<tag_name>`


let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata)

if(args1 === undefined){
    console.log(daftarList)
}else{
    if(args1 === "help"){
        console.log(daftarList);
    }else if(args1 === "list"){
        console.log("Daftar pekerjaan");
        for (let i = 0; i < data.length; i++) {
            console.log(`${i+1}. [${data[i].status ? 'X' : ' '}] ${data[i].task_content}`)    
        }
    }else if(args1 === 'task'){
        console.log("Daftar Pekerjaan")
        for (let i = 0; i < data.length; i++){
            if(args2 == data[i].task_id){
                console.log(`task_id : ${data[i].task_id} [${data[i].status ? 'X' : ' '}] ${data[i].task_content}`)
            }else if( args2 == undefined){
                console.log("Masukkan id task")
            }
        }
    }else if(args1 === 'add'){
        let sentence = ''
        let index = 1;
        for (let i = 0; i < data.length; i++) {
            index++;   
        }
        for (let i = 3; i < args.length; i++) {
            sentence += args[i] + ' ';
        }
        data.push({
            "task_id" : index,
            "task_content" : sentence.trim(),
            "status" : false,
            "tags"   : []
        })
        fs.writeFileSync('data.json', JSON.stringify(data,null,4))
        console.log(`"${sentence}" telah di tambahkan`)
    }else if(args1 === 'delete'){
        const deleteData = data.task_content;
        data.splice(parseInt(args2) - 1, 1);
        fs.writeFileSync('data.json', JSON.stringify(data,null,4))
        console.log(`${deleteData} telah di hapus dari daftar`)
    }else if(args1 === 'complete'){
        console.log("data ke i telah selesai")
    }else if(args1 === 'uncompleted'){
        console.log("data ke i belum selesai")
    }else if(args1 === 'list:outstanding'){
        if(args2 == 'asc'){
            console.log("Daftar Pekerjaan")
            for (let i = 0; i < data.length; i++) {
                if(data[i].status === false){
                    console.log(`${i+1}.[ ] ${data[i].task_content}`)    
                }   
            }
        }else{
            console.log("Daftar Pekerjaan")
            for (let j = data.length -1 ; j >= 0; j--) {
                if(data[j].status === false){
                    console.log(`${j+1}.[ ] ${data[j].task_content}`)    
                }
            }
        }
    }else if(args1 === 'list:completed'){
        if(args2 == 'asc'){
            console.log("Daftar Pekerjaan")
            for (let i = 0; i < data.length; i++) {
                if(data[i].status === true){
                    console.log(`${i+0}.[X] ${data[i].task_content}`)    
                }
            }
        }else{
            console.log("Daftar Pekerjaan")
            for (let j = data.length -1 ; j >= 0; j--) {
                if(data[j].status === true){
                    console.log(`${j+0}.[X] ${data[j].task_content}`)    
                }
            }
        }
    }else if(args1 === 'tags'){
        let inputId = args2;
        let inputTag = process.argv[4];
        data.push({
            "tags" : inputTag,
        })
        fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
    }else{
        console.log("Filter Data")
    }
}