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

        // Array donde se almacenaran los promedios Generales Por Mes
        $scope.datosPromedioGeneralEnero = [];
        $scope.datosPromedioGeneralFebrero  = [];
        $scope.datosPromedioGeneralMarzo = [];
        $scope.datosPromedioGeneralAbril  = [];
        $scope.datosPromedioGeneralMayo  = [];
        $scope.datosPromedioGeneralJunio  = [];
        $scope.datosPromedioGeneralJulio  = [];
        $scope.datosPromedioGeneralAgosto  = [];
        $scope.datosPromedioGeneralSeptiembre  = [];
        $scope.datosPromedioGeneralOctubre  = [];
        $scope.datosPromedioGeneralNoviembre  = [];
        $scope.datosPromedioGeneralDiciembre  = [];

        $scope.datosPromedioGeneral = [];
        $scope.EtiquetaMeses = [];

        // Array con datos de los meses
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

        //array de los dias
        $scope.lunes = [];
        $scope.martes = [];
        $scope.miercoles = [];
        $scope.jueves = [];
        $scope.viernes = [];
        $scope.sabado = [];
        $scope.domingo = [];

        //array con promedio de los dias por hora
        $scope.lunesPro = [];
        $scope.martesPro = [];
        $scope.miercolesPro = [];
        $scope.juevesPro = [];
        $scope.viernesPro = [];
        $scope.sabadoPro = [];
        $scope.domingoPro = [];
        $scope.band = true;

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
            $scope.MesSelect = $scope.ReturnMes($scope.mesSeleccionado);
            $scope.vector = $scope.TratarDiario($scope.MesSelect,$scope.diaInicio,$scope.diaFinal);
            console.log($scope.vector);
            $scope.TrabajarMes($scope.vector, $scope.mesSeleccionado, $scope.diaInicio);

        }
        
        //REALIZAR ANALISIS POR MES

        $scope.mostrarFormAnalisisXMes =  function(){
            $scope.FormMes = true;        
            $scope.mostrarSeleccionTemporada = false;

        }


        $scope.realizarAnalisisxMes= function(){
            console.log($scope.mesSeleccionado);
            console.log($scope.promedioAnalisisxMes);
            $scope.MesSelect = $scope.ReturnMes($scope.mesSeleccionado);
            $scope.TrabajarMes($scope.MesSelect,$scope.mesSeleccionado);
        }


        //REALIZAR ANALISIS GENERAL
        $scope.realizarAnalisisGeneral = function(){
          console.log('Analisis General');
          if($scope.band){
            $scope.DatosMeses();
            $scope.band = false;
          }
          $scope.analisixMes = false;
          $scope.analisixDia = false;
          $scope.analisiGeneral = false;

        }

        //Funcion que separa los datos de un Mes en Rangos segun los
        //Dias que el usuario seleccione
        $scope.TratarDiario = function($array, $inicio, $fin) {
          $scope.arreglodiario = [];
          var diaIn = $inicio;
          var diaFin = $fin;
          var f = $fin-$inicio;
          indice = 0;
          for(var i = 0;i<=f;i++){
            for(var j = 0; j<$array.length;j++){
             
                if($array[j].NUMERODIA == diaIn){
                  $scope.arreglodiario.push($array[j]);
               }
            }
            if (diaIn==diaFin) {
                break;
            }
            diaIn++;
          }
          return $scope.arreglodiario;
      }

        //Devuelve el array del mes seleccionado
        $scope.ReturnMes = function($dato) {
          if($dato == 'Enero'){
            return $scope.datosMesEnero;
          }else if($dato == 'Febrero'){
            return $scope.datosMesFebrero;
          }else if($dato == 'Marzo'){
            return $scope.datosMesMarzo;
          }else if($dato == 'Abril'){
            return $scope.datosMesAbril;
          }else if($dato == 'Mayo'){
            return $scope.datosMesMayo;
          }else if($dato == 'Junio'){
            return $scope.datosMesJunio;
          }else if($dato == 'Julio'){
            return $scope.datosMesJulio;
          }else if($dato == 'Agosto'){
            return $scope.datosMesAgosto;
          }else if($dato == 'Septiembre'){
            return $scope.datosMesSeptiembre;
          }else if($dato == 'Octubre'){
            return $scope.datosMesOctubre;
          }else if($dato == 'Noviembre'){
            return $scope.datosMesNoviembre;
          }else {
            return $scope.datosMesDiciembre;
          }
        }

        //Funcion para Operar un Solo Mes

        $scope.TrabajarMes = function($array, $nombre, $dia=1) {
          $scope.DatosPromedioGeneralMes = $scope.ToArrayPromedioDia($array,$scope.ContadorDiasMes($array, $dia));
          $scope.datosPromedioGeneral.push($scope.DatosPromedioGeneralMes);
          $scope.EtiquetaMeses.push($nombre);
          $scope.grafica($scope.datosPromedioGeneral,$scope.EtiquetaMeses);

        }

        //Comprueba si existen los meses
        $scope.DatosMeses = function(){
          if($scope.ComprobarArray($scope.datosMesEnero)){
            $scope.datosPromedioGeneralEnero = $scope.ToArrayPromedioDia($scope.datosMesEnero, $scope.ContadorDiasMes($scope.datosMesEnero));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralEnero);
            $scope.EtiquetaMeses.push("ENERO");
            $scope.ContadorDiaNombre($scope.datosMesEnero);
            $scope.evaluarDiasHoras();
          }

          if($scope.ComprobarArray($scope.datosMesFebrero)){
            $scope.datosPromedioGeneralFebrero = $scope.ToArrayPromedioDia($scope.datosMesFebrero, $scope.ContadorDiasMes($scope.datosMesFebrero));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralFebrero);
            $scope.EtiquetaMeses.push("FEBRERO");
            $scope.ContadorDiaNombre($scope.datosMesFebrero);
            $scope.evaluarDiasHoras();
          }

          if($scope.ComprobarArray($scope.datosMesMarzo)){
            $scope.datosPromedioGeneralMarzo = $scope.ToArrayPromedioDia($scope.datosMesMarzo, $scope.ContadorDiasMes($scope.datosMesMarzo));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralMarzo);
            $scope.EtiquetaMeses.push("MARZO");
            $scope.ContadorDiaNombre($scope.datosMesMarzo);
            $scope.evaluarDiasHoras();
          }

          if($scope.ComprobarArray($scope.datosMesAbril)){
            $scope.datosPromedioGeneralAbril = $scope.ToArrayPromedioDia($scope.datosMesAbril, $scope.ContadorDiasMes($scope.datosMesAbril));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralAbril);
            $scope.EtiquetaMeses.push("ABRIL");
            $scope.ContadorDiaNombre($scope.datosMesAbril);
            $scope.evaluarDiasHoras();
          }
          if($scope.ComprobarArray($scope.datosMesMayo)){
            $scope.datosPromedioGeneralMayo = $scope.ToArrayPromedioDia($scope.datosMesMayo, $scope.ContadorDiasMes($scope.datosMesMayo));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralMayo);
            $scope.EtiquetaMeses.push("MAYO");
            $scope.ContadorDiaNombre($scope.datosMesMayo);
            $scope.evaluarDiasHoras();
          }

          if($scope.ComprobarArray($scope.datosMesJunio)){
            $scope.datosPromedioGeneralJunio = $scope.ToArrayPromedioDia($scope.datosMesJunio, $scope.ContadorDiasMes($scope.datosMesJunio));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralJunio);
            $scope.EtiquetaMeses.push("JUNIO");
            $scope.ContadorDiaNombre($scope.datosMesJunio);
            $scope.evaluarDiasHoras();
          }

          if($scope.ComprobarArray($scope.datosMesJulio)){
            $scope.datosPromedioGeneralJulio = $scope.ToArrayPromedioDia($scope.datosMesJulio, $scope.ContadorDiasMes($scope.datosMesJulio));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralJulio);
            $scope.EtiquetaMeses.push("JULIO");
            $scope.ContadorDiaNombre($scope.datosMesJulio);
            $scope.evaluarDiasHoras();
          }
          if($scope.ComprobarArray($scope.datosMesAgosto)){
            $scope.datosPromedioGeneralAgosto = $scope.ToArrayPromedioDia($scope.datosMesAgosto, $scope.ContadorDiasMes($scope.datosMesAgosto));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralAgosto);
            $scope.EtiquetaMeses.push("AGOSTO");
            $scope.ContadorDiaNombre($scope.datosMesAgosto);
            $scope.evaluarDiasHoras();
          }

          if($scope.ComprobarArray($scope.datosMesSeptiembre)){
            $scope.datosPromedioGeneralSeptiembre = $scope.ToArrayPromedioDia($scope.datosMesSeptiembre, $scope.ContadorDiasMes($scope.datosMesSeptiembre));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralSeptiembre);
            $scope.EtiquetaMeses.push("SEPTIEMBRE");
            $scope.ContadorDiaNombre($scope.datosMesSeptiembre);
            $scope.evaluarDiasHoras();
          }

          if($scope.ComprobarArray($scope.datosMesOctubre)){
            $scope.datosPromedioGeneralOctubre= $scope.ToArrayPromedioDia($scope.datosMesOctubre, $scope.ContadorDiasMes($scope.datosMesOctubre));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralOctubre);
            $scope.EtiquetaMeses.push("OCTUBRE");
            $scope.ContadorDiaNombre($scope.datosMesOctubre);
            $scope.evaluarDiasHoras();
          }

          if($scope.ComprobarArray($scope.datosMesNoviembre)){
            $scope.datosPromedioGeneralNoviembre = $scope.ToArrayPromedioDia($scope.datosMesNoviembre, $scope.ContadorDiasMes($scope.datosMesNoviembre));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralNoviembre);
            $scope.EtiquetaMeses.push("NOVIEMBRE");
            $scope.ContadorDiaNombre($scope.datosMesNoviembre);
            $scope.evaluarDiasHoras();
          }

          if($scope.ComprobarArray($scope.datosMesDiciembre)){
            $scope.datosPromedioGeneralSeptiembre = $scope.ToArrayPromedioDia($scope.datosMesDiciembre, $scope.ContadorDiasMes($scope.datosMesDiciembre));
            $scope.datosPromedioGeneral.push($scope.datosPromedioGeneralDiciembre);
            $scope.EtiquetaMeses.push("DICIEMBRE");
            $scope.ContadorDiaNombre($scope.datosMesDiciembre);
            $scope.evaluarDiasHoras();
          }
 
          $scope.grafica($scope.datosPromedioGeneral,$scope.EtiquetaMeses);

        }



        //Cuenta los Dias que hay en el mes
        $scope.ContadorDiasMes = function($array,$dia=1){
          var dia = $dia;
          for(var i=0;i<$array.length;i++){
            if($array[i].NUMERODIA == dia.toString()){
            }else{
              dia++;
            }
          }
          return dia;
        } 
         
        //Comprueba si el array esta vacio
        $scope.ComprobarArray = function($array){
          if($array.length>0){
            return true; //No esta vacio
          }else{
            return false; //esta vacio
          }
        }

        //regresa un array de boletos por Hora general
        $scope.ToArrayPromedioDia = function($array,$dias=1){
          var arreglo = [];
          var auxiliar = 0;
            for(var j = 0; j<24;j++) {
              for(var k = 0; k<$array.length; k++) {
                if($array[k].HORA == j){
                  auxiliar += parseInt($array[k].BOLETOS);
                }
                arreglo[j] = auxiliar/$dias;
              }
              auxiliar = 0;
            }
          
        //console.log(arreglo);
        return arreglo; 
      }


      //Funcion encargada de sacar el promedio de los boletos por dia especifico por hora, de mes especifico
        $scope.ToArrayPromedioDias = function($array){
          var arreglo = [];
          var auxiliar = 0;
          var cont = 0;
            for(var j = 0; j<24;j++) {
              for(var k = 0; k<$array.length; k++) {
                if($array[k].HORA == j ) {
                  auxiliar += parseInt($array[k].BOLETOS);
                  cont++;
                }
                arreglo[j] = auxiliar/cont;
              }
              auxiliar = 0;
              cont = 0;
            }
          
        console.log(arreglo);
        return arreglo; 
      }

      //Cuenta los El total de días que tiene el mes(cuantos lunes,martes...etc)
      $scope.ContadorDiaNombre = function($array) {

        for(var i=0; i<$array.length;i++) {
          if($array[i].DIA == 'lunes') {
            $scope.lunes.push($array[i]);
          }
          if($array[i].DIA == 'martes') {
            $scope.martes.push($array[i]);
          }
          if($array[i].DIA == 'miércoles') {
            $scope.miercoles.push($array[i]);
          }
          if($array[i].DIA == 'jueves') {
            $scope.jueves.push($array[i]);
          }
          if($array[i].DIA == 'viernes') {
            $scope.viernes.push($array[i]);
          }
          if($array[i].DIA == 'sábado') {
            $scope.sabado.push($array[i]);
          }
          if($array[i].DIA == 'domingo') {
            $scope.domingo.push($array[i]);
          }
        }

      }

      //Funcion para sacar el promedio de boletos vendidos por Dia,(Promediod de Boletos de todos los lunes, de todos los martes,etc)

      $scope.evaluarDiasHoras = function() {
       $scope.lunesPro = $scope.ToArrayPromedioDias($scope.lunes);
       $scope.martesPro = $scope.ToArrayPromedioDias($scope.martes);
       $scope.miercolesPro = $scope.ToArrayPromedioDias($scope.miercoles);
       $scope.juevesPro = $scope.ToArrayPromedioDias($scope.jueves);
       $scope.viernesPro = $scope.ToArrayPromedioDias($scope.viernes);
       $scope.sabadoPro = $scope.ToArrayPromedioDias($scope.sabado);
       $scope.domingoPro = $scope.ToArrayPromedioDias($scope.domingo); 
      }
          


      //Funcion para Graficar
      $scope.grafica = function ($array, $arrayMes) {
        console.log("GRAFICA");

        $scope.labels = ["00:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00",
        "05:00-06:00","06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00",
        "12:00-13:00","13:00-14:00","14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", 
        "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-24:00"];
            
            $scope.data = $array;
            $scope.series = $arrayMes;
            $scope.colors = ['#72C02C', '#3498DB', '#717984', '#F1C40F','#c12abc','#f9f90e','#ffa528','#1af4db','#61a1f4'
            ,'#f90233','#f78aa0','#d8c6f4'];

            $scope.options = { legend: { display: true, color: "black" },
                title: {
                display: true,
                text: 'Promedios'
                },
                elements: {
                  line: {
                    fill: false,
                    tension: 0
                }
              }
             }; 

            $scope.onClick = function (points, evt) {
            console.log(points, evt);
            };

          }

    }]);

    app.directive("importSheetJs", [SheetJSImportDirective]);

})(); //