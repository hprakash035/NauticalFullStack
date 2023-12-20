// const { location } = require("express/lib/response");

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/model/odata/v4/Context",
    "sap/ui/model/odata/v4/ODataContextBinding",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History", "sap/ui/core/Fragment"
  ],
  function (BaseController, ODataModel, Context, MessageBox, ODataContextBinding, MessageToast, History, Fragment) {
    "use strict";
   

    return BaseController.extend("nauticalfe.controller.MasterVoyageType", {

      onInit: function () {

      },
  
     //Anurag and Himanshu 
      newEntries: function () {
        this.getView().byId("createTypeTable").setVisible(false)
        this.getView().byId("entryTypeTable").setVisible(true)
        this.getView().byId("mainPageFooter").setVisible(true)


      },onSave: function () {

        var value1 =  this.getView().byId("voyCode").getValue();
        var value2 =  this.getView().byId("voyCodeDesc").getValue();


        
        var data = {

          VOYCD: value1,

          VOYDES: value2

        };
        console.log(data);


        var that = this;
        var JsonData = JSON.stringify(data)
        let EndPoint = "/odata/v4/nautical/VOYTYP";
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
          that.getView().getModel().refresh();      
                },onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteView1");
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

  });

