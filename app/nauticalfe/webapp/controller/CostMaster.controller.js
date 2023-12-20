sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ],
    function(Controller,History) {
      "use strict";
  
      return Controller.extend("nauticalfe.controller.CostMaster", {
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
    
            var value1 =  this.getView().byId("COSTCODE").getValue();
            var value2 =  this.getView().byId("CSTCODES").getValue();
    
    
            
            var data = {
    
              COSTCODE: value1,
    
              CSTCODES: value2
    
            };
            console.log(data);
    
    
            
            var JsonData = JSON.stringify(data)
            let EndPoint = "/odata/v4/nautical/NAVOYGC";
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