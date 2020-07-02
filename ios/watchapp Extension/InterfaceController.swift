//
//  InterfaceController.swift
//  watchapp Extension
//
//  Created by Alec Goldberg on 7/2/20.
//

import WatchKit
import Foundation
import WatchConnectivity


class InterfaceController: WKInterfaceController, WCSessionDelegate {
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    
    print("\nSession activated with state: \(activationState.rawValue)\n")
    
    if let error = error {
      print(error)
    }
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    print("recieved message \(message)!")
    WKInterfaceDevice.current().play(.notification)
  }
  
  func configureSession() -> Bool {
    
    // We can only send messages if WCSession supported
    if WCSession.isSupported() {
      
      self.session = WCSession.default
      self.session?.delegate = self
      self.session?.activate()
      
      return true
    }
    
    return false
  }
  
  func sendDataToCompanion(message: [String : Any]) {
    
    print("pingcompanion pressed")
    
    // iOS device must be reachable with an active session
    if let activeSession = session, activeSession.isReachable {
      
      activeSession.sendMessage(message, replyHandler: nil)
      
      // Haptic feedback for success/failure
      WKInterfaceDevice.current().play(.success)
      print("sent message successfuly!")
      
    } else {
      
      WKInterfaceDevice.current().play(.failure)
      print("iPhone is not reachable!!")
    }
  }
  
  
  var tapCount = 0
  var session: WCSession?
  
  @IBOutlet weak var sendButton: WKInterfaceButton!
  
  @IBOutlet weak var tapCountLabel: WKInterfaceLabel!
  
  @IBAction func sendButtonTapped() {
    
    tapCount += 1
    tapCountLabel.setText("Tap Count: " + String(tapCount))
    sendDataToCompanion(message: ["Tapped": true])
  }
  
  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    
    tapCountLabel.setText("Tap Count: " + String(tapCount))
    
    // Configure interface objects here.
  }
  
  override func willActivate() {
    // This method is called when watch view controller is about to be visible to user
    super.willActivate()
    
    if !configureSession() { fatalError()}
  }
  
  override func didDeactivate() {
    // This method is called when watch view controller is no longer visible
    super.didDeactivate()
  }
  
}
