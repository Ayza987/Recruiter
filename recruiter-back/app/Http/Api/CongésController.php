<?php

namespace App\Http\Api;

use App\Models\Congés;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class CongésController extends Controller
{
    public function index(){
        $congés = Congés::all();
        if ($congés->count() > 0){
            return response()->json(['congés' => $congés], 200);
        }else{
            return response()->json(['message' => 'No data found'], 404);
        }
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'nom_personnel' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'type_congés' => 'required|string',
            'statut_congés' => 'required|string'
        ]);

        if ($validator->fails()){
            return response()->json(['errors' => $validator->messages()], 422);
        }else{
            $congés = Congés::create([
                'nom_personnel' => $request->nom_personnel,
                'date_debut' => $request->date_debut,
                'date_fin' => $request->date_fin,
                'type_congés' => $request->type_congés,
                'statut_congés' => $request->statut_congés
            ]);

            if ($congés){
                return response()->json(['message' => 'Congés added'], 200);
            }else{
                return response()->json(['message' => 'Error sending data'], 500);
            }
        }
    }

    public function show($id){
        $congés = Congés::find($id);
        if($congés){
            return response()->json(['congés' => $congés], 200);
        }else{
            return response()->json(['message' => 'No Congés found'], 404);
        }
    }

    public function update(Request $request, int $id){
        $congés = Congés::find($id);
        if($congés){
            $congés->update([
                'nom_personnel' => $request->nom_personnel,
                'date_debut' => $request->date_debut,
                'date_fin' => $request->date_fin,
                'type_congés' => $request->type_congés,
                'statut_congés' => $request->statut_congés
            ]);
            return response()->json(['message' => 'Congés updated'], 200);
        }else{
            return response()->json(['message' => 'No congés found'], 404);
        }
    }

    public function destroy($id){
        $congés = Congés::find($id);
        if($congés){
            $congés->delete();
            return response()->json(['message' => 'Congés deleted'], 200);
        }else{
            return response()->json(['message' => 'No congés found'], 404);
        }
    }
}
