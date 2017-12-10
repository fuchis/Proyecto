(function() {
    /* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
    var app = angular.module('analisisADO', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'chart.js']);

    /* Inject SheetJSExportService */
    app.factory('SheetJSExportService', SheetJSExportService);
    SheetJSExportService.inject = ['uiGridExporterService'];

    app.controller('analisisCtrl', ['$scope', '$http', 'SheetJSExportService', function($scope, $http, SheetJSExportService) {
        $scope.mostrarPanelSeleccion = true;
        $scope.mostrarSeleccionTemporada = false;
        $scope.mostrarTablaExcel = true;
        $scope.mostrarSeleccionTemporada = false;
        $scope.FormDia = false;


        //variablles que muestran campos segun los datos
        $scope.analisixDia = false;
        $scope.analisixMes= false;
        $scope.analisiGeneral = false;

        // array que guarda listado de meses
        $scope.MesesExistentes = []; 

        //array que guarda los dias que existen en un mes
        $scope.diasMes = [];

        // Array con datos
        $scope.datosMesEnero = []; 
        $scope.datosMesFebrero = []; 
        $scope.datosMesMarzo = []; 
        $scope.datosMesAbril = []; 
        $scope.datosMesMayo = []; 
        $scope.datosMesJunio = []; 
        $scope.datosMesJulio = []; 
        $scope.datosMesAgosto = []; 
        $scope.datosMesSeptiembre= []; 
        $scope.datosMesOctubre= []; 
        $scope.datosMesNoviembre= []; 
        $scope.datosMesDiciembre= []; 
 

        //Funciones para exportar el excel
        $scope.gridOptions = {
            columnDefs: [

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            showHeader: true,
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
            },
            /* SheetJS Service setup */
            filename: "SheetJSAngular",
            sheetname: "ng-SheetJS",
            gridMenuCustomItems: [{
                title: 'Export all data as XLSX',
                action: function($event) {
                    SheetJSExportService.exportXLSX($scope.gridApi);
                },
                order: 200
            }, {
                title: 'Export all data as XLSB',
                action: function($event) {
                    SheetJSExportService.exportXLSB($scope.gridApi);
                },
                order: 201
            }],

        };


      
        $scope.llenarCamposExcel = function() {
               for (var i in $scope.gridOptions.data) {
                //Llenar la columna AÑOV que no cuenta con algun dato toma el valor anterior 
                // Se repite para DIAV Y MESV
                if ($scope.gridOptions.data[i].AÑOV == undefined) {
                    $scope.gridOptions.data[i].AÑOV = $scope.gridOptions.data[i - 1].AÑOV;
                }
                if ($scope.gridOptions.data[i].MESV == undefined) {
                    $scope.gridOptions.data[i].MESV = $scope.gridOptions.data[i - 1].MESV;
                }
                if ($scope.gridOptions.data[i].DIAV == undefined) {
                    $scope.gridOptions.data[i].DIAV = $scope.gridOptions.data[i - 1].DIAV;
                }
            }
            //Llenar las columnas  FECHA DIA MES
            $scope.dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
            $scope.meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

            $scope.gridOptions.data.forEach(function(Elemento) {
                $scope.date = new Date(Elemento.AÑOV + "-" + Elemento.MESV + "-" + Elemento.DIAV);

                $scope.fechaNum = $scope.date.getDay() + 1;
                $scope.mes_name = $scope.date.getMonth();
                $scope.year = $scope.date.getFullYear();


                let options = {
                    weekday: 'long'
                };

                Elemento.FECHA = Elemento.DIAV + '/' + $scope.meses[$scope.mes_name] + '/' + $scope.year;
                Elemento.DIA = $scope.date.toLocaleDateString('es-MX', options);
                Elemento.MES = $scope.meses[$scope.mes_name];

            });
            
          $scope.guardarMeses();

        }
        
        //Esta funcion separa cada mes y lo guarda en un array ejemplo $scope.datosEnero
        $scope.guardarMeses = function(){
            for (var i in $scope.gridOptions.data) {


                if($scope.gridOptions.data[i].MESV == '1'){
                    $scope.datosMesEnero.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV
                    }));

                }
                if($scope.gridOptions.data[i].MESV == '2'){
                    $scope.datosMesFebrero.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));
                }
                if($scope.gridOptions.data[i].MESV == '3'){
                    $scope.datosMesMarzo.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }
                if($scope.gridOptions.data[i].MESV == '4'){
                    $scope.datosMesAbril.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }
                if($scope.gridOptions.data[i].MESV == '5'){
                    $scope.datosMesMayo.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '6'){
                    $scope.datosMesJunio.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }
                if($scope.gridOptions.data[i].MESV == '7'){
                    $scope.datosMesJulio.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '8'){
                    $scope.datosMesAgosto.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '9'){
                    $scope.datosMesSeptiembre.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '10'){
                    $scope.datosMesOctubre.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '11'){
                    $scope.datosMesNoviembre.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '12'){
                    $scope.datosMesDiciembre.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS
                    }));

                }


            }

            // console.log($scope.datosMesEnero.length);
            // console.log($scope.datosMesFebrero.length);
            // console.log($scope.datosMesMarzo.length);
            // console.log($scope.datosMesAbril.length);
            // console.log($scope.datosMesMayo.length);
            // console.log($scope.datosMesJunio.length);
            // console.log($scope.datosMesJulio.length);
            // console.log($scope.datosMesAgosto.length);
            // console.log($scope.datosMesSeptiembre.length);
            // console.log($scope.datosMesNoviembre.length);
            // console.log($scope.datosMesDiciembre.length);

            $scope.mostrarPanelSeleccion = false;
            $scope.mostrarTablaExcel = true;
            $scope.mostrarSeleccionTemporada =true;

          //aqui se meten en un array los meses que tengan datos 

            if($scope.datosMesEnero.length !=0){
               $scope.MesesExistentes.push("Enero");
            }
             if($scope.datosMesFebrero.length !=0){
               $scope.MesesExistentes.push("Febrero");
            }
             if($scope.datosMesMarzo.length !=0){
               $scope.MesesExistentes.push("Marzo");
            }
             if($scope.datosMesAbril.length !=0){
               $scope.MesesExistentes.push("Abril");
            }
             if($scope.datosMesMayo.length !=0){
               $scope.MesesExistentes.push("Mayo");
            }
             if($scope.datosMesJunio.length !=0){
               $scope.MesesExistentes.push("Junio");
            }
             if($scope.datosMesJulio.length !=0){
               $scope.MesesExistentes.push("Julio");
            }
             if($scope.datosMesAgosto.length !=0){
               $scope.MesesExistentes.push("Agosto");
            }
             if($scope.datosMesSeptiembre.length !=0){
               $scope.MesesExistentes.push("Septiembre");
            }
             if($scope.datosMesNoviembre.length !=0){
               $scope.MesesExistentes.push("Noviembre");
            }
             if($scope.datosMesDiciembre.length !=0){
               $scope.MesesExistentes.push("Diciembre");
            }


             // Aqui se valida que opciones se muestra al usuario segun los datos que seleccione
            //Si hay 2 meses o mas mostraremos los 3 tipos de analisis PORMES PORDIA GENERAL
            //Si hay 1 Mes Solo mostraremos 2 tipos PORMES PORDIA
            if($scope.MesesExistentes.length >1){
                 $scope.analisixDia = true;
                 $scope.analisixMes = true;
                 $scope.analisiGeneral = true;
                 console.log("Primera opcion");
            }
            else{
                $scope.analisixDia = true;
                $scope.analisixMes = true;
                console.log("Segunda opcion");
   
            }

        }
        $scope.traerDatosMes = function(){
            if($scope.mesSeleccionado == "Enero"){
                $scope.datosMesEnero.forEach(function(Elemento) {
                    console.log(Elemento.NUMERODIA);

                });
              
                // FALTA SACAR LOS DIAS QUE HAY EN ENERO
                //SE REPITE POR CADA MES
                console.log($scope.diasMes);

            }
            if($scope.mesSeleccionado == "Febrero"){

            }
            if($scope.mesSeleccionado == "Marzo"){

            }
            if($scope.mesSeleccionado == "Abril"){

            }
            if($scope.mesSeleccionado == "Mayo"){

            }
            if($scope.mesSeleccionado == "Junio"){

            }
            if($scope.mesSeleccionado == "Julio"){

            }
            if($scope.mesSeleccionado == "Agosto"){

            }
            if($scope.mesSeleccionado == "Septiembre"){

            }
            if($scope.mesSeleccionado == "Octubre"){

            }
            if($scope.mesSeleccionado == "Noviembre"){

            }
            if($scope.mesSeleccionado == "Diciembre"){

            }


        }
        
        $scope.analisisxDia =  function(){
            $scope.FormDia = true;        
            $scope.mostrarSeleccionTemporada = false;

        }


       


    }]);


    app.directive("importSheetJs", [SheetJSImportDirective]);
})();