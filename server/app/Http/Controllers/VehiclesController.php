<?php

namespace App\Http\Controllers;

use App\Models\Agilog;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VehiclesController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $vehicles = Vehicle::select('id', 'name', 'is_agidrive')->orderby('id')->get();
        return response()->json(['success' => true, 'data' => $vehicles, 'error' => null], 200);
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function getLogCount(Request $request, $id)
    {
        $isVehicleExist = Vehicle::find($id);
        if (is_null($isVehicleExist)) {
            return response()->json(['success' => false, 'data' => [], 'error' => 'Vehicle is not found'], 200);
        }

        $logCountByMonth = Agilog::with('vehicle')->select(
            'vehicle_id',
            DB::raw('count(vehicle_id) as logCount'),
            DB::raw("DATE_FORMAT(local_time,'%Y-%m') as months"),
        )
            ->where('vehicle_id', $id)
            ->orderBy('months', 'desc')
            ->groupBy('months')
            ->get();

        return response()->json(['success' => true, 'data' => $logCountByMonth, 'error' => null], 200);
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function getlastInfo(Request $request, $id)
    {
        $isVehicleExist = Vehicle::find($id);
        if (is_null($isVehicleExist)) {
            return response()->json(['success' => false, 'data' => [], 'error' => 'Vehicle is not found'], 200);
        }

        $lastInfo = Agilog::with('vehicle')->select(
            'vehicle_id',
            'local_time',
            'lat',
            'lng',
            'speed',
            'direction',
        )
            ->where('vehicle_id', $id)
            ->orderBy('local_time', 'DESC')
            ->first();

        return response()->json(['success' => true, 'data' => !is_null($lastInfo) ? $lastInfo : [], 'error' => null], 200);
    }

}
