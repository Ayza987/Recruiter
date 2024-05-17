<?php

namespace App\Http\Api;

use App\Models\Personnel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;


class PersonnelController extends Controller
{
    public function index(){
        $personnels = Personnel::all();
        if ($personnels->count() > 0){

        return response()->json([
            'personnels' => $personnels


        ], 200);
    }else{
        return response()->json([
            'message' => 'No data found'


        ], 404);
    
    }

    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'poste' => 'required|string',
            'email' => 'required|email|unique:personnel',
            'telephone' => 'required|string',
            'password' => 'required|string',
            'statut' => 'required|string'

        ]);

        if ($validator->fails()){

            return response()->json([
                'errors' => $validator->messages()

            ], 422);
        }else{

            $personnel = Personnel::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'poste' => $request->poste,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'password' => $request->password,
                'statut' => $request->statut

            ]);

            if ($personnel){

                return response()->json([
                    'message' => 'Personnel added'
        
        
                ], 200);
            }else{
                return response()->json([
                    'message' => 'Error sending data'

                ], 500);
            
            }

        }
    }

    public function show($id){

        $personnel = Personnel::find($id);
        if($personnel){
            return response()->json([
                'personnel' => $personnel
    
    
            ], 200);

        }else{
            return response()->json([
                'message' => 'No personnel found'
    
    
            ], 404);

        }
         

    }

    public function update(Request $request, int $id){

        $personnel = Personnel::find($id);
        if($personnel){
            $personnel->update([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'poste' => $request->poste,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'password' => $request->password,
                'statut' => $request->statut

            ]);
            return response()->json([
                'message' => 'Personnel updated' ], 200);

        }else{
            return response()->json([
                'message' => 'No personnel found'
    
    
            ], 404);

        }
    }

    public function destroy($id){

        $personnel = Personnel::find($id);{
            if($personnel){
                $personnel->delete();
                return response()->json([
                    'message' => 'Personnel deleted' ], 200);
            }else{
                return response()->json([
                    'message' => 'No personnel found'
        
        
                ], 404);
            }

        }
    }
}
