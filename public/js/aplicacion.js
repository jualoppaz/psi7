function firmar(privateKey, hashAlg, message) {
    var rsa = new RSAKey();
    rsa.readPrivateKeyFromPEMString(privateKey);
    var sig = new KJUR.crypto.Signature({"alg": hashAlg, "prov": "cryptojs/jsrsa"});
    sig.initSign(rsa);
    sig.updateString(message);
    return sig.sign();
}

function verificar(message, hashAlg, sign, publicKey) {
    var x509 = new X509();
    x509.readCertPEM(publicKey);
    return x509.subjectPublicKeyRSA.verifyString(message, sign);
}

function generarClave(tamanoClave) {
    var claves = KEYUTIL.generateKeypair("RSA", tamanoClave);
    var clavePublica = KEYUTIL.getKey(claves.pubKeyObj);
    var clavePrivada = KEYUTIL.getKey(claves.prvKeyObj);

    clavePrivada.isPrivate = true; //bug: https://github.com/kjur/jsrsasign/issues/53
    var privateKey = KEYUTIL.getPEM(claves.prvKeyObj, "PKCS1PRV");
    var publicKey= KEYUTIL.getPEM(clavePublica);

    return {"privateKey": privateKey, "publicKey": publicKey};
}