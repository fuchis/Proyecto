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
        $scope.FormMes = false;        



        //variablles que muestran campos segun los datos
        $scope.analisixDia = false;
        $scope.analisixMes= false;
        $scope.analisiGeneral = false;

        $scope.seleccionRangosDias = false;

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
 

        $scope.gridOptions = {
            columnDefs: [

            ],
            enableGridMenu: false,
            enableSelectAll: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            showHeader: true,
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
            },
            /* SheetJS Service setup */
            filename: "Analisis",
            sheetname: "ng-SheetJS",
            gridMenuCustomItems: [{
            //     title: 'Export all data as XLSX',
            //     action: function($event) {
            //         SheetJSExportService.exportXLSX($scope.gridApi);
            //     },
            //     order: 200
            // }, {
            //     title: 'Export all data as XLSB',
            //     action: function($event) {
            //         SheetJSExportService.exportXLSB($scope.gridApi);
            //     },
            //     order: 201
            }],

        };


        $scope.cargar = 0;
        $scope.llenarCamposExcel = function() {
            $scope.cargar ++;
            console.log($scope.cargar);
               if($scope.cargar == 1){
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

        }else{
            alert("Se esta cargando su archivo");
        }

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
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));
                }
                if($scope.gridOptions.data[i].MESV == '3'){
                    $scope.datosMesMarzo.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));

                }
                if($scope.gridOptions.data[i].MESV == '4'){
                    $scope.datosMesAbril.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));

                }
                if($scope.gridOptions.data[i].MESV == '5'){
                    $scope.datosMesMayo.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '6'){
                    $scope.datosMesJunio.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));

                }
                if($scope.gridOptions.data[i].MESV == '7'){
                    $scope.datosMesJulio.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '8'){
                    $scope.datosMesAgosto.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '9'){
                    $scope.datosMesSeptiembre.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '10'){
                    $scope.datosMesOctubre.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '11'){
                    $scope.datosMesNoviembre.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

                    }));

                }
                 if($scope.gridOptions.data[i].MESV == '12'){
                    $scope.datosMesDiciembre.push(angular.copy({
                      DIA: $scope.gridOptions.data[i].DIA,
                      HORA: $scope.gridOptions.data[i].HORA,
                      BOLETOS: $scope.gridOptions.data[i].BOLETOS,
                      NUMERODIA : $scope.gridOptions.data[i].DIAV

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
                $scope.seleccionRangosDias = false;

             if($scope.mesSeleccionado == "Enero"){
               $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;

                for (var i = 0; i <$scope.datosMesEnero.length; i++) {
                    $scope.diasMes.push($scope.datosMesEnero[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }
            if($scope.mesSeleccionado == "Febrero"){
             $scope.diasMes = [];
             $scope.diaInicio = 0;
             $scope.diaFinal = 0;
                for (var i = 0; i <$scope.datosMesFebrero.length; i++) {
                    $scope.diasMes.push($scope.datosMesFebrero[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }
            if($scope.mesSeleccionado == "Marzo"){
               $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;

                for (var i = 0; i <$scope.datosMesMarzo.length; i++) {
                    $scope.diasMes.push($scope.datosMesMarzo[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }
            if($scope.mesSeleccionado == "Abril"){
               $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;
                for (var i = 0; i <$scope.datosMesAbril.length; i++) {
                    $scope.diasMes.push($scope.datosMesAbril[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];


            }
            if($scope.mesSeleccionado == "Mayo"){
              $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;

                  for (var i = 0; i <$scope.datosMesMayo.length; i++) {
                    $scope.diasMes.push($scope.datosMesMayo[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];


            }
            if($scope.mesSeleccionado == "Junio"){
               $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;

                for (var i = 0; i <$scope.datosMesJunio.length; i++) {
                    $scope.diasMes.push($scope.datosMesJunio[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }
            if($scope.mesSeleccionado == "Julio"){
               $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;
                for (var i = 0; i <$scope.datosMesJulio.length; i++) {
                    $scope.diasMes.push($scope.datosMesJulio[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }
            if($scope.mesSeleccionado == "Agosto"){
                $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;

                for (var i = 0; i <$scope.datosMesAgosto.length; i++) {
                    $scope.diasMes.push($scope.datosMesAgosto[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }
            if($scope.mesSeleccionado == "Septiembre"){
                $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;

                for (var i = 0; i <$scope.datosMesSeptiembre.length; i++) {
                    $scope.diasMes.push($scope.datosMesSeptiembre[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }
            if($scope.mesSeleccionado == "Octubre"){
                  $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;

                for (var i = 0; i <$scope.datosMesOctubre.length; i++) {
                    $scope.diasMes.push($scope.datosMesOctubre[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }
            if($scope.mesSeleccionado == "Noviembre"){
               $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;
                for (var i = 0; i <$scope.datosMesNoviembre.length; i++) {
                    $scope.diasMes.push($scope.datosMesNoviembre[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }
            if($scope.mesSeleccionado == "Diciembre"){
                $scope.diasMes = [];
               $scope.diaInicio = 0;
               $scope.diaFinal = 0;
                for (var i = 0; i <$scope.datosMesDiciembre.length; i++) {
                    $scope.diasMes.push($scope.datosMesDiciembre[i].NUMERODIA);
                }
                
                for (var i = 1; i < $scope.diasMes.length; ) {
                    if ($scope.diasMes[i-1] === $scope.diasMes[i])
                       $scope.diasMes.splice(i,1);
                   else
                      i++;
                }
                $scope.diasMes.sort((a, b) => a - b );
                $scope.seleccionRangosDias = true;
                $scope.diaInicio = $scope.diasMes[0];
                $scope.diaFinal = $scope.diasMes[$scope.diasMes.length-1];

            }


        }
        $scope.Regresar = function(){
            $scope.FormDia=false;
            $scope.FormMes = false;
            $scope.seleccionRangosDias = false;
            $scope.mesSeleccionado = 0;
            $scope.diaInicio=null;
            $scope.diaFinal=null;
            $scope.promedioAnalisisxDia=null;
            $scope.promedioAnalisisxMes=null;
            $scope.mostrarSeleccionTemporada = true;
            // _messageHTML("Puntos", "¡El numero de puntos debe ser mayor a 3!", "warning");


        }
        // REALIZAR ANALISIS POR DIA
        $scope.mostrarFormAnalisisXdia =  function(){
            $scope.FormDia = true;        
            $scope.mostrarSeleccionTemporada = false;

        }

        $scope.realizarAnalisisxDia = function(){
            console.log($scope.mesSeleccionado);
            console.log($scope.diaInicio);
            console.log($scope.diaFinal);
            console.log($scope.promedioAnalisisxDia);
        }
        
        //REALIZAR ANALISIS POR MES

        $scope.mostrarFormAnalisisXMes =  function(){
            $scope.FormMes = true;        
            $scope.mostrarSeleccionTemporada = false;

        }

        $scope.realizarAnalisisxMes= function(){
            console.log($scope.mesSeleccionado);
            console.log($scope.promedioAnalisisxMes);
        }
        //REALIZAR ANALISIS GENERAL
        $scope.realizarAnalisisGeneral = function(){
            console.log('Analisis General');
        }


       


    }]);


    app.directive("importSheetJs", [SheetJSImportDirective]);
})();