(function() {
    /* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
    var app = angular.module('analisisADO', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter']);

    /* Inject SheetJSExportService */
    app.factory('SheetJSExportService', SheetJSExportService);
    SheetJSExportService.inject = ['uiGridExporterService'];

    app.controller('analisisCtrl', ['$scope', '$http', 'SheetJSExportService', function($scope, $http, SheetJSExportService) {
        $scope.mostrarPanelSeleccion = true;
        $scope.mostrarTablaExcel = true;

        //arreglo con DIA HORA MES
        $scope.datosMesDiaHoraBolesto = [];
        //arreglo con promedio de horas x mes
        $scope.promediosxHoraxMes = [];
        //arreglo con promedio por hora x dia de la semaa
        $scope.promediosxHoraxDiaSemana = [];
        $scope.promHORA = [];

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
            console.log("click");

            $scope.promHora1 = 0;
            //Llenar las olumnas AÑOV MESV DIAV
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
            for (var i in $scope.gridOptions.data) {
                $scope.datosMesDiaHoraBolesto.push(angular.copy({
                    DIA: $scope.gridOptions.data[i].DIA,
                    MES: $scope.gridOptions.data[i].MES,
                    HORA: $scope.gridOptions.data[i].HORA,
                    BOLETOS: $scope.gridOptions.data[i].BOLETOS
                }));
            }

            //prueba llamar a  validarMesesexistentes para el calculo de promedios por mes 
            $scope.validarMesesExistentes();


            //PRUEBA
            $scope.promedioDiaHora();

            $scope.mostrarPanelSeleccion = false;
            $scope.mostrarTablaExcel = true;
        }
        $scope.validarMesesExistentes = function() {
            // Funcion para validar que meses contiene el exel a analizar
            $scope.mes1 = "";
            $scope.mes2 = "";
            $scope.mes3 = "";
            $scope.mes4 = "";
            $scope.mes5 = "";
            $scope.mes6 = "";
            $scope.mes7 = "";
            $scope.mes8 = "";
            $scope.mes9 = "";
            $scope.mes10 = "";
            $scope.mes11 = "";
            $scope.mes12 = "";
            $scope.gridOptions.data.forEach(function(Elemento) {
                if (angular.uppercase(Elemento.MES) == "ENERO") {
                    $scope.mes1 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "FEBRERO") {
                    $scope.mes2 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "MARZO") {
                    $scope.mes3 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "ABRIL") {
                    $scope.mes4 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "MAYO") {
                    $scope.mes5 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "JUNIO") {
                    $scope.mes6 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "JULIO") {
                    $scope.mes7 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "AGOSTO") {
                    $scope.mes8 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "SEPTIEMBRE") {
                    $scope.mes9 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "OCTUBRE") {
                    $scope.mes10 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "NOVIEMBRE") {
                    $scope.mes11 = angular.uppercase(Elemento.MES);
                }
                if (angular.uppercase(Elemento.MES) == "DICIEMBRE") {
                    $scope.mes12 = angular.uppercase(Elemento.MES);
                }

            });

            if ($scope.mes1 != null && $scope.mes1 != undefined) {
                $scope.guardarPromedioXmes($scope.mes1);
            }
            if ($scope.mes2 != null && $scope.mes2 != undefined) {
                $scope.guardarPromedioXmes($scope.mes2);
            }
            if ($scope.mes3 != null && $scope.mes3 != undefined) {
                $scope.guardarPromedioXmes($scope.mes3);
            }
            if ($scope.mes4 != null && $scope.mes4 != undefined) {
                $scope.guardarPromedioXmes($scope.mes4);
            }
            if ($scope.mes5 != null && $scope.mes5 != undefined) {
                $scope.guardarPromedioXmes($scope.mes5);
            }
            if ($scope.mes6 != null && $scope.mes6 != undefined) {
                $scope.guardarPromedioXmes($scope.mes6);
            }
            if ($scope.mes7 != null && $scope.mes7 != undefined) {
                $scope.guardarPromedioXmes($scope.mes7);
            }
            if ($scope.mes8 != null && $scope.mes8 != undefined) {
                $scope.guardarPromedioXmes($scope.mes8);
            }
            if ($scope.mes9 != null && $scope.mes9 != undefined) {
                $scope.guardarPromedioXmes($scope.mes9);
            }
            if ($scope.mes10 != null && $scope.mes10 != undefined) {
                $scope.guardarPromedioXmes($scope.mes10);
            }
            if ($scope.mes11 != null && $scope.mes11 != undefined) {
                $scope.guardarPromedioXmes($scope.mes11);
            }
            if ($scope.mes12 != null && $scope.mes12 != undefined) {
                $scope.guardarPromedioXmes($scope.mes12);
            }

        }
        //==============Funciones para la grafica de horas  pico=================================
        //Guardar promedio a su respectivo array 
        $scope.guardarPromedioXmes = function(mes) {
            if (mes == "ENERO") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "FEBRERO") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "MARZO") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "ABRIL") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "MAYO") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "JUNIO") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "JULIO") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "AGOSTO") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "SEPTIEMBRE") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "OCTUBRE") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "NOVIEMBRE") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
            if (mes == "DICIEMBRE") {
                $scope.promediosxHoraxMes = $scope.calcularPromedioXMes(mes);
            }
        }
        //Realiza la sumatoria de todos las horas 0... de un determinado mes se repite ssegun los meses que existan 
        //en el pdf
        $scope.calcularPromedioXMes = function(mes) {
            $scope.numerodedatos = 0;
            $scope.promedioHORA = 0;
            $scope.promedio = 0;
            //$scope.mes ="";
            for (v = 0; v <= 23; v++) {
                for (i = 0; i < $scope.datosMesDiaHoraBolesto.length; i++) {
                    //console.log(v);
                    if ($scope.datosMesDiaHoraBolesto[i].HORA == v && angular.uppercase($scope.datosMesDiaHoraBolesto[i].MES) == mes) {
                        $scope.promedioHORA += parseInt($scope.datosMesDiaHoraBolesto[i].BOLETOS);
                        $scope.promedio = $scope.promedioHORA;
                        $scope.numerodedatos++;
                        //$scope.mes = $scope.datosMesDiaHoraBolesto[i].MES;
                    }
                }
                $scope.promHORA.push(angular.copy({
                    MES: mes,
                    HORA: v,
                    PROMEDIO: ($scope.promedioHORA / parseInt($scope.numerodedatos))
                }));
                $scope.numerodedatos = 0;
                $scope.promedioHORA = 0;
            }
            return $scope.promHORA;
            $scope.promHORA = [];

        }

        //========Funciones para la grafica de promedio por dia de la semana por hor========================
        $scope.promedioDiaHora = function() {
            console.log("funcion llamada");
            $scope.numerodedatos = 0;
            $scope.promedioHORA = 0;
            $scope.promedio = 0;

            for (v = 0; v < 23; v++) {
                for (i = 0; i < $scope.datosMesDiaHoraBolesto.length; i++) {
                    if ($scope.datosMesDiaHoraBolesto[i].HORA == v && angular.uppercase($scope.datosMesDiaHoraBolesto[i].MES) == angular.uppercase("enero")) {
                        $scope.promedioHORA += parseInt($scope.datosMesDiaHoraBolesto[i].BOLETOS);
                        $scope.promedio = $scope.promedioHORA;
                        $scope.numerodedatos++;
                    }
                }
                $scope.promediosxHoraxDiaSemana.push(angular.copy({
                    MES: enero,
                    HORA: v,
                    PROMEDIO: ($scope.promedioHORA / parseInt($scope.numerodedatos))
                }));

                $scope.numerodedatos = 0;
                $scope.promedioHORA = 0;
            }
            // return $scope.promHORA;
            // $scope.promHORA = [];
            console.log($scope.promediosxHoraxDiaSemana);

        }



    }]);


    app.directive("importSheetJs", [SheetJSImportDirective]);
})();