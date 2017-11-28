 if (angular.uppercase(Elemento.MES) == "ENERO" && Elemento.MES != null && Elemento.MES != undefined) {
                    $scope.promediosxHoraxMes = $scope.calcularPromedioXMes( angular.uppercase(Elemento.MES));
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