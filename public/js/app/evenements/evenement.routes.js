"use strict";
var evenement_list_component_1 = require("./evenement-list.component");
var evenement_edit_component_1 = require("./evenement-edit.component");
exports.EVENEMENT_ROUTES = [
    { path: '', component: evenement_list_component_1.EvenementListComponent },
    { path: 'creer', component: evenement_edit_component_1.EvenementEditComponent },
    { path: ':id/edit', component: evenement_edit_component_1.EvenementEditComponent },
    { path: ':id/copie', component: evenement_edit_component_1.EvenementEditComponent }
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvZXZlbmVtZW50cy9ldmVuZW1lbnQucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx1RUFBb0U7QUFDcEUsdUVBQW9FO0FBR3ZELFFBQUEsZ0JBQWdCLEdBQVc7SUFDcEMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxpREFBc0IsRUFBQztJQUM5QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlEQUFzQixFQUFDO0lBQ25ELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsaURBQXNCLEVBQUM7SUFDdEQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxpREFBc0IsRUFBQztDQUMxRCxDQUFDIiwiZmlsZSI6ImV2ZW5lbWVudHMvZXZlbmVtZW50LnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRXZlbmVtZW50TGlzdENvbXBvbmVudCB9IGZyb20gJy4vZXZlbmVtZW50LWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRXZlbmVtZW50RWRpdENvbXBvbmVudCB9IGZyb20gJy4vZXZlbmVtZW50LWVkaXQuY29tcG9uZW50JztcclxuXHJcblxyXG5leHBvcnQgY29uc3QgRVZFTkVNRU5UX1JPVVRFUzogUm91dGVzID0gW1xyXG4gICAgeyBwYXRoOiAnJywgY29tcG9uZW50OiBFdmVuZW1lbnRMaXN0Q29tcG9uZW50fSxcclxuICAgIHsgcGF0aDogJ2NyZWVyJywgY29tcG9uZW50OiBFdmVuZW1lbnRFZGl0Q29tcG9uZW50fSxcclxuICAgIHsgcGF0aDogJzppZC9lZGl0JywgY29tcG9uZW50OiBFdmVuZW1lbnRFZGl0Q29tcG9uZW50fSxcclxuICAgIHsgcGF0aDogJzppZC9jb3BpZScsIGNvbXBvbmVudDogRXZlbmVtZW50RWRpdENvbXBvbmVudH1cclxuXTtcclxuIl19
