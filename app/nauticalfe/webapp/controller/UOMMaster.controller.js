sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"
    ],
    function(Controller,MessageToast) {
      "use strict";
   
      return Controller.extend("nauticalfe.controller.UOMMaster", {
        onInit() {
        },onBackPress: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView");
        },onBackPressHome: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteView1");
        },onPressExit:function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView");
        },newEntries: function () {
          
          this.getView().byId("createTypeTable").setVisible(false)
          this.getView().byId("entryTypeTable").setVisible(true)
          this.getView().byId("mainPageFooter").setVisible(true)
  
  
        },onSave: function () {
  
          var value1 =  this.getView().byId("UOM").getValue();
          var value2 =  this.getView().byId("UOMDES").getValue();
  
  
          
          var data = {
  
            UOM: value1,
  
            UOMDES: value2
  
          };
          console.log(data);
  
  
         
          var JsonData = JSON.stringify(data)
          let EndPoint = "/odata/v4/nautical/NAVOYGUOM";
          fetch(EndPoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JsonData
          })
            .then(function (res) {
              
              if (res.ok) {
                location.reload();
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
            
  
           
            
  
  
  
  
  
        }
  
      });
    }
  );