<?php

namespace App\Http\Api;

use App\Models\Candidat;
use App\Mail\CandidatMail;
use App\Mail\AdminMail;
use App\Mail\ApproveMail;
use App\Mail\RejectMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;


class CandidatController extends Controller
{
    public function index(){
        $candidats = Candidat::all();
        if ($candidats->count() > 0){

        return response()->json([
            'candidats' => $candidats


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
            'email' => 'required|email',
            'telephone' => 'required|string',
            'Date_de_naissance' => 'required|date',
            'Adresse' => 'required|string',
            'intitule' => 'required|string'

        ]);

        if ($validator->fails()){

            return response()->json([
                'errors' => $validator->messages()

            ], 422);
        }else{

            $candidat = Candidat::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'Date_de_naissance' => $request->Date_de_naissance,
                'Adresse' => $request->Adresse,
                'intitule' => $request->intitule

            ]);

            if ($candidat){
              
                Mail::to($request->email)
                 ->send(new CandidatMail($candidat));

                Mail::to('denise.ndongo@2027.ucac-icam.com')
                 ->send(new AdminMail($candidat));

                return response()->json([
                    'message' => 'Candidat added'
        
        
                ], 200);
            }else{
                return response()->json([
                    'message' => 'Error sending data'

                ], 500);
            
            }

        }
    }

    public function show($id){

        $candidat = Candidat::find($id);
        if($candidat){
            return response()->json([
                'candidat' => $candidat
    
    
            ], 200);

        }else{
            return response()->json([
                'message' => 'No Candidat found'
    
    
            ], 404);

        }
         

    }

    public function approve(Request $request)
    {
        $data = $request->all();

        Mail::to($data['email'])->send(new ApproveMail($data));

        return response()->json(['message' => 'Un email a été envoyé au candidat.']);
    }

    public function reject(Request $request)
    {
        $data = $request->all();

        Mail::to($data['email'])->send(new RejectMail($data));

        return response()->json(['message' => 'Un email a été envoyé au candidat']);
    }


    public function update(Request $request, int $id){

        $candidat = Candidat::find($id);
        if($candidat){
            $candidat->update([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'Date_de_naissance' => $request->Date_de_naissance,
                'Adresse' => $request->Adresse,
                'intitule' => $request->intitule

            ]);
            return response()->json([
                'message' => 'Candidat updated' ], 200);

        }else{
            return response()->json([
                'message' => 'No candidat found'
    
    
            ], 404);

        }
    }

    public function destroy($id){

        $candidat = Candidat::find($id);{
            if($candidat){
                $candidat->delete();
                return response()->json([
                    'message' => 'Candidat deleted' ], 200);
            }else{
                return response()->json([
                    'message' => 'No candidat found'
        
        
                ], 404);
            }

        }
    }
}
