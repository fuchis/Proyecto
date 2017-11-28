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


 //==============Funciones para la grafica de horas  pico=================================
        //Guardar promedio a su respectivo array 
        $scope.guardarPromedioXmes = function (mes) {
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
        $scope.calcularPromedioXMes = function (mes) {
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

        $scope.graficaHoraPicoxMes = function () {
            console.log("GRAFICA");
            $scope.mesescontenidos = [];
            $scope.promediosxHoraxMes.forEach(function (Elemento) {
                
            });
            console.log($scope.mesescontenidos);

             
            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['Series A'];
            
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40]
            ];

            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };

            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            };
        }


        //========Funciones para la grafica de promedio por dia de la semana por hor========================
        $scope.promedioDiaHora = function () {

            $scope.numerodedatos = 0;
            $scope.promedioHORA = 0;
            $scope.promedio = 0;

            for (v = 0; v < 23; v++) {
                for (i = 0; i < $scope.datosMesDiaHoraBolesto.length; i++) {
                    if ($scope.datosMesDiaHoraBolesto[i].HORA == 0 && angular.uppercase($scope.datosMesDiaHoraBolesto[i].MES) == angular.uppercase("enero") && angular.uppercase($scope.datosMesDiaHoraBolesto[i].DIA) == angular.uppercase("viernes")) {
                      //  console.log($scope.datosMesDiaHoraBolesto[i].BOLETOS);

                    }

                }
                $scope.promediosxHoraxDiaSemana.push(angular.copy({
                    MES: 'Enero',
                    HORA: v,
                    DIA: 'Viernes',
                    PROMEDIO: ($scope.promedioHORA / parseInt($scope.numerodedatos))
                }));

                $scope.numerodedatos = 0;
                $scope.promedioHORA = 0;
            }
            // return $scope.promHORA;
            // $scope.promHORA = [];
         //   console.log($scope.promediosxHoraxDiaSemana);

        }