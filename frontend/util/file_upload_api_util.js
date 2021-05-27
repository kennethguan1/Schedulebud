export const fileUpload = (type, uploadData) => {

    let upload_data = JSON.stringify(uploadData);               //from controllers
    let url;

    switch (type){
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
        data: {upload_data},
    }).done(()=> alert('Successfully Uploaded'))
    .fail(()=> alert('Upload Failed'));

};