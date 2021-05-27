export const importFile = (dataType, fileData) => {

    let url;
    let import_data = JSON.stringify(fileData)


    switch (dataType){
        case 'location':
            url = `/api/parse_location`;
            break;
        case 'technician':
            url = `/api/parse_technician`;
            break;
        case 'work-order':
            url = `/api/parse_work_order`;
            break;
    }

    return $.ajax({
        url: url,
        method: "POST",
        data: {import_data},
    })
    .done(()=> alert('Successfully Uploaded'))
    .fail(()=> alert('Upload Failed'));

};