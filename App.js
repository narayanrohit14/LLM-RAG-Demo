import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockKnowledgeBase = [
  { id: 1, content: "LLMs are large language models trained on vast amounts of text data." },
  { id: 2, content: "RAG stands for Retrieval-Augmented Generation in the context of AI." },
  { id: 3, content: "RAG combines information retrieval with text generation to produce more accurate and contextual responses." },
];

const LlmRagDemo = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [retrievedInfo, setRetrievedInfo] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    // Simple keyword matching for demo purposes
    const relevantInfo = mockKnowledgeBase.find(item => 
      userInput.toLowerCase().includes(item.content.toLowerCase().split(' ')[0])
    );

    if (relevantInfo) {
      setRetrievedInfo(relevantInfo.content);
      setResponse(`Based on the retrieved information: ${relevantInfo.content}, here's a response to your query: ${userInput}`);
    } else {
      setRetrievedInfo('No relevant information found in the knowledge base.');
      setResponse(`I don't have specific information about that, but I'll do my best to answer: ${userInput}`);
    }
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>LLM and RAG Interactive Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demo">
          <TabsList>
            <TabsTrigger value="demo">Demo</TabsTrigger>
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
          </TabsList>
          <TabsContent value="demo">
            <div className="space-y-4">
              <Input
                placeholder="Ask a question about LLMs or RAG..."
                value={userInput}
                onChange={handleInputChange}
              />
              <Button onClick={handleSubmit}>Submit</Button>
              {retrievedInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle>Retrieved Information</CardTitle>
                  </CardHeader>
                  <CardContent>{retrievedInfo}</CardContent>
                </Card>
              )}
              {response && (
                <Card>
                  <CardHeader>
                    <CardTitle>LLM Response</CardTitle>
                  </CardHeader>
                  <CardContent>{response}</CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="explanation">
            <p>This demo simulates how RAG works with LLMs:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>You input a question.</li>
              <li>The system searches a small "knowledge base" for relevant info.</li>
              <li>If found, it uses this info to generate a response.</li>
              <li>If not found, it generates a response based on its training.</li>
            </ol>
            <p className="mt-4">This demonstrates how RAG can enhance LLM responses with specific, retrieved information.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LlmRagDemo;
