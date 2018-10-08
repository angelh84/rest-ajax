(function ($, api, growl) {


    /* =============== DOMAIN EVENTS =============== */


    // submit new domain
    $('.domain-form').on('submit', function (e) {
        e.preventDefault();
        
        // start loading gif
        loaderUnBlock( '#modal_create_site .modal-content' );

        // api call to create domain
        api.domain.create(data)
            .done(function (response) {
                // reload datatables with response
                $(".datatable").DataTable().ajax.reload(json => dataUpdateOnReload(json));
                growl.websiteCreated();
            })
            .fail(function (response) {
                growl.error();
                console.log('api.domain.create fail:, ', response);
            })
            .always(function(){
                $stepyModal.modal('hide');
                loaderUnBlock( '#modal_create_site .modal-content' );
            });
    });

    $('#modal_legal_form').on('submit', function (e) {
        e.preventDefault();

        var domainId = $(this).parents('#modal_legal').data('domainId');
        var domainObj = getDomainObj(domainId);
        var legal = domainObj.legal_information;
        var data = getFormKeyValue($(this));

        // domain legal info 
        legal.City = data.City;
        legal.Zip = data.Zip;
        legal.StreetAddress = data.StreetAddress;
        legal.Phone = data.Phone;
        legal.State = data.State;
        legal.Email = data.Email;

        api.domain.edit(domainId, domainObj)
            .done(function (response) {
                $('#modal_legal').modal('hide');
                growl.legalInfoEditSuccess();
                // console.log(response)
            })
            .fail(function (response) {
                $('#modal_legal').modal('hide');
                growl.error();
                console.log('api.domain.edit fail:, ', response)
            });
    });

    /* ================ EDIT CONTENT EVENT ================ */

    $('#edit-content-form').on('submit', function (e) {
        e.preventDefault();

        var contentId = $contentModal.data('domain-id');
        var contentObj = getDomainObj(contentId);
        
        // start loader gif
        loaderBlock($contentModal);
        contentObj.content_body = content;

        api.content.edit(contentId, domainObj)
            .done(function (response) {
                growl.editContentSuccess();
            })
            .fail(function (response) {
                console.log('api.content.edit failed: ', response);
                growl.error();
            })
            .always(function (response) {
                $contentModal.modal('hide');
                loaderUnBlock($contentModal);
            });
    })

})(jQuery, api, growl);