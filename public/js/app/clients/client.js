"use strict";
var Client = (function () {
    function Client(clientId, noClient, prenom, nom, noCompte, courriel, cell, compagnie, adresse, ville, codePostal, telPrincipal, province, pays, fax, telSecondaire, memo, memoAVenir, noExTaxeProv, noExTaxeFed, selectStatut, selectSource, modifPar, modif, dateDernEv, creerPar, dateCree) {
        this.clientId = clientId;
        this.noClient = noClient;
        this.prenom = prenom;
        this.nom = nom;
        this.noCompte = noCompte;
        this.courriel = courriel;
        this.cell = cell;
        this.compagnie = compagnie;
        this.adresse = adresse;
        this.ville = ville;
        this.codePostal = codePostal;
        this.telPrincipal = telPrincipal;
        this.province = province;
        this.pays = pays;
        this.fax = fax;
        this.telSecondaire = telSecondaire;
        this.memo = memo;
        this.memoAVenir = memoAVenir;
        this.noExTaxeProv = noExTaxeProv;
        this.noExTaxeFed = noExTaxeFed;
        this.selectStatut = selectStatut;
        this.selectSource = selectSource;
        this.modifPar = modifPar;
        this.modif = modif;
        this.dateDernEv = dateDernEv;
        this.creerPar = creerPar;
        this.dateCree = dateCree;
    }
    return Client;
}());
exports.Client = Client;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwcmludDJ2Mi4wL2Fzc2V0cy9hcHAvY2xpZW50cy9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0lBNkJJLGdCQUFhLFFBQWlCLEVBQUUsUUFBaUIsRUFBRSxNQUFjLEVBQUUsR0FBWSxFQUFFLFFBQWlCLEVBQUUsUUFBaUIsRUFBRSxJQUFhLEVBQUUsU0FBaUIsRUFBRSxPQUFnQixFQUFFLEtBQWEsRUFDbkwsVUFBbUIsRUFBRSxZQUFxQixFQUFFLFFBQWdCLEVBQUUsSUFBYSxFQUFFLEdBQVksRUFBRSxhQUFxQixFQUFFLElBQWEsRUFDL0gsVUFBbUIsRUFBRSxZQUFxQixFQUFFLFdBQW9CLEVBQUUsWUFBcUIsRUFBRSxZQUFxQixFQUFFLFFBQWlCLEVBQUUsS0FBWSxFQUMvSSxVQUFpQixFQUFFLFFBQWlCLEVBQUUsUUFBZTtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQTdEQSxBQTZEQyxJQUFBO0FBN0RZLHdCQUFNIiwiZmlsZSI6ImNsaWVudHMvY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENsaWVudHtcclxuICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICBub0NsaWVudDogbnVtYmVyO1xyXG4gICAgcHJlbm9tOiBzdHJpbmc7XHJcbiAgICBub206IHN0cmluZztcclxuICAgIG5vQ29tcHRlOiBzdHJpbmc7XHJcbiAgICBjb3VycmllbDogc3RyaW5nO1xyXG4gICAgY2VsbDogc3RyaW5nO1xyXG4gICAgY29tcGFnbmllOiBzdHJpbmc7IFxyXG4gICAgYWRyZXNzZTogc3RyaW5nO1xyXG4gICAgdmlsbGU6IHN0cmluZztcclxuICAgIGNvZGVQb3N0YWw6IHN0cmluZztcclxuICAgIHRlbFByaW5jaXBhbDogc3RyaW5nO1xyXG4gICAgcHJvdmluY2U6IHN0cmluZztcclxuICAgIHBheXM6IHN0cmluZztcclxuICAgIGZheDogc3RyaW5nO1xyXG4gICAgdGVsU2Vjb25kYWlyZTogc3RyaW5nO1xyXG4gICAgbWVtbzogc3RyaW5nO1xyXG4gICAgbWVtb0FWZW5pcjogc3RyaW5nO1xyXG4gICAgbm9FeFRheGVQcm92OiBzdHJpbmc7XHJcbiAgICBub0V4VGF4ZUZlZDogc3RyaW5nO1xyXG4gICAgc2VsZWN0U3RhdHV0OiBzdHJpbmc7XHJcbiAgICBzZWxlY3RTb3VyY2U6IHN0cmluZztcclxuICAgIG1vZGlmUGFyOiBzdHJpbmc7XHJcbiAgICBtb2RpZjogRGF0ZTtcclxuICAgIGRhdGVEZXJuRXY6IERhdGU7XHJcbiAgICBjcmVlclBhcjogc3RyaW5nO1xyXG4gICAgZGF0ZUNyZWU6IERhdGU7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCBjbGllbnRJZD86IHN0cmluZywgbm9DbGllbnQ/OiBudW1iZXIsIHByZW5vbT86c3RyaW5nLCBub20/OiBzdHJpbmcsIG5vQ29tcHRlPzogc3RyaW5nLCBjb3VycmllbD86IHN0cmluZywgY2VsbD86IHN0cmluZywgY29tcGFnbmllPzpzdHJpbmcsIGFkcmVzc2U/OiBzdHJpbmcsIHZpbGxlPzpzdHJpbmcsXHJcbiAgICAgICAgIGNvZGVQb3N0YWw/OiBzdHJpbmcsIHRlbFByaW5jaXBhbD86IHN0cmluZywgcHJvdmluY2U/OnN0cmluZywgcGF5cz86IHN0cmluZywgZmF4Pzogc3RyaW5nLCB0ZWxTZWNvbmRhaXJlPzpzdHJpbmcsIG1lbW8/OiBzdHJpbmcsXHJcbiAgICAgICAgIG1lbW9BVmVuaXI/OiBzdHJpbmcsIG5vRXhUYXhlUHJvdj86IHN0cmluZywgbm9FeFRheGVGZWQ/OiBzdHJpbmcsIHNlbGVjdFN0YXR1dD86IHN0cmluZywgc2VsZWN0U291cmNlPzogc3RyaW5nLCBtb2RpZlBhcj86IHN0cmluZywgbW9kaWY/OiBEYXRlLCBcclxuICAgICAgICAgZGF0ZURlcm5Fdj86IERhdGUsIGNyZWVyUGFyPzogc3RyaW5nLCBkYXRlQ3JlZT86IERhdGUpe1xyXG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSBjbGllbnRJZDtcclxuICAgICAgICB0aGlzLm5vQ2xpZW50ID0gbm9DbGllbnQ7XHJcbiAgICAgICAgdGhpcy5wcmVub20gPSBwcmVub207XHJcbiAgICAgICAgdGhpcy5ub20gPSBub207XHJcbiAgICAgICAgdGhpcy5ub0NvbXB0ZSA9IG5vQ29tcHRlO1xyXG4gICAgICAgIHRoaXMuY291cnJpZWwgPSBjb3VycmllbDtcclxuICAgICAgICB0aGlzLmNlbGwgPSBjZWxsO1xyXG4gICAgICAgIHRoaXMuY29tcGFnbmllID0gY29tcGFnbmllO1xyXG4gICAgICAgIHRoaXMuYWRyZXNzZSA9IGFkcmVzc2U7XHJcbiAgICAgICAgdGhpcy52aWxsZSA9IHZpbGxlO1xyXG4gICAgICAgIHRoaXMuY29kZVBvc3RhbCA9IGNvZGVQb3N0YWw7XHJcbiAgICAgICAgdGhpcy50ZWxQcmluY2lwYWwgPSB0ZWxQcmluY2lwYWw7XHJcbiAgICAgICAgdGhpcy5wcm92aW5jZSA9IHByb3ZpbmNlO1xyXG4gICAgICAgIHRoaXMucGF5cyA9IHBheXM7XHJcbiAgICAgICAgdGhpcy5mYXggPSBmYXg7XHJcbiAgICAgICAgdGhpcy50ZWxTZWNvbmRhaXJlID0gdGVsU2Vjb25kYWlyZTtcclxuICAgICAgICB0aGlzLm1lbW8gPSBtZW1vO1xyXG4gICAgICAgIHRoaXMubWVtb0FWZW5pciA9IG1lbW9BVmVuaXI7XHJcbiAgICAgICAgdGhpcy5ub0V4VGF4ZVByb3YgPSBub0V4VGF4ZVByb3Y7XHJcbiAgICAgICAgdGhpcy5ub0V4VGF4ZUZlZCA9IG5vRXhUYXhlRmVkO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0U3RhdHV0ID0gc2VsZWN0U3RhdHV0O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0U291cmNlID0gc2VsZWN0U291cmNlO1xyXG4gICAgICAgIHRoaXMubW9kaWZQYXIgPSBtb2RpZlBhcjtcclxuICAgICAgICB0aGlzLm1vZGlmID0gbW9kaWY7XHJcbiAgICAgICAgdGhpcy5kYXRlRGVybkV2ID0gZGF0ZURlcm5FdjtcclxuICAgICAgICB0aGlzLmNyZWVyUGFyID0gY3JlZXJQYXI7XHJcbiAgICAgICAgdGhpcy5kYXRlQ3JlZSA9IGRhdGVDcmVlOyAgIFxyXG4gICAgfVxyXG59Il19
