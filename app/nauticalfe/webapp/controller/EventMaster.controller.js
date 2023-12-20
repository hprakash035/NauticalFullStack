sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/m/MessageToast"

    ],
    function(Controller,History,MessageToast) {
      "use strict";
  
      return Controller.extend("nauticalfe.controller.EventMaster", {
        onInit() {
        },
        onBackPress: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView");
        },newEntries: function () {
          this.getView().byId("createTypeTable").setVisible(false)
          this.getView().byId("entryTypeTable").setVisible(true)
          this.getView().byId("mainPageFooter").setVisible(true)
  
  
        },onSave: function () {
  
          var value1 =  this.getView().byId("EVTTY").getValue();
          var value2 =  this.getView().byId("TEXT").getValue();
  
  
          
          var data = {
  
            EVTTY: value1,
  
            TEXT: value2
  
          };
          console.log(data);
  
  
          
          var JsonData = JSON.stringify(data)
          let EndPoint = "/odata/v4/nautical/EVENT_MAS";
          fetch(EndPoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JsonData
          })
            .then(function (res) {
              
              if (res.ok) {
                console.log("Entity created successfully");
                MessageToast.show(`Entity created successfully`)
               
  
              }
              else {
                console.log("Failed");
                MessageToast.show(`Failed`)
              }
            })
            .catch(function (err) {
              console.log("error", err);
            })
            this.getView().byId("createTypeTable").setVisible(true)
            this.getView().byId("entryTypeTable").setVisible(false)
            this.getView().byId("mainPageFooter").setVisible(false)
            this.getView().getModel().refresh();
         },
         backPress: function () {
           const oHistory = History.getInstance();
           const sPreviousHash = oHistory.getPreviousHash();
   
           if (sPreviousHash !== undefined) {
             window.history.go(-1);
           } else {
             const oRouter = this.getOwnerComponent().getRouter();
             oRouter.navTo("MastView", {}, true);
           }
         }, onExit: function () {
           const oRouter = this.getOwnerComponent().getRouter();
           oRouter.navTo("MastView");
         }
      });
    }
  );
  