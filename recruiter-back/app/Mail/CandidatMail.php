<?php

namespace App\Mail;

use App\Models\Candidat;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CandidatMail extends Mailable
{
    use Queueable, SerializesModels;

    public $candidat;

    /**
     * Create a new message instance.
     */
    public function __construct(Candidat $candidat)
    {
        $this->candidat = $candidat;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Réception dossier de candidature')
        ->view('mail.candidat')
        ->with([
            'intitule' => $this->candidat->intitule,
            'prenom' => $this->candidat->prenom,
            'nom' => $this->candidat->nom
        ]);
    }
}
