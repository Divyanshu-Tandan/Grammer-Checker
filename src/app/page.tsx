'use client';

import React, {useState, useRef, useEffect} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {correctGrammar} from '@/ai/flows/grammar-correction';
import {rewriteSentence} from '@/ai/flows/sentence-rewriter';
import {Separator} from '@/components/ui/separator';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [grammarExplanation, setGrammarExplanation] = useState('');
  const [rewriteExplanation, setRewriteExplanation] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleGrammarCheck = async () => {
    if (inputText) {
      const result = await correctGrammar({text: inputText});
      setCorrectedText(result.correctedText);
      setGrammarExplanation(result.explanation);
    }
  };

  const handleRewriteSentence = async () => {
    if (inputText) {
      const result = await rewriteSentence({text: inputText});
      setRewrittenText(result.rewrittenText);
      setRewriteExplanation(result.explanation);
    }
  };

  useEffect(() => {
    const element = document.getElementById('initialText');
    if (element) {
      setInputText(element.innerText);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background p-4 md:p-8">
      {/* Input Area */}
      <div className="md:w-1/2 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">LexiCorrect</h1>
        <Textarea
          id="input-text"
          placeholder="Enter text here..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="rounded-md shadow-sm h-48 md:h-auto"
          ref={inputRef}
        />
        <div className="flex space-x-4">
          <Button variant="outline" onClick={handleGrammarCheck}>
            Check Grammar
          </Button>
          <Button variant="outline" onClick={handleRewriteSentence}>
            Rewrite Sentence
          </Button>
        </div>
      </div>

      {/* Suggestions Area */}
      <div className="md:w-1/2 flex flex-col space-y-4 mt-4 md:mt-0 md:ml-8">
        {/* Grammar Check Card */}
        <Card className="shadow-md rounded-md bg-card">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Grammar Correction</h2>
            <Separator className="my-2" />
            {correctedText ? (
              <>
                <p className="text-primary">
                  <strong>Corrected Text:</strong> {correctedText}
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Explanation:</strong> {grammarExplanation}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">
                Click &quot;Check Grammar&quot; to see suggestions.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Sentence Rewrite Card */}
        <Card className="shadow-md rounded-md bg-card">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Sentence Rewrite</h2>
            <Separator className="my-2" />
            {rewrittenText ? (
              <>
                <p className="text-primary">
                  <strong>Rewritten Text:</strong> {rewrittenText}
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Explanation:</strong> {rewriteExplanation}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">
                Click &quot;Rewrite Sentence&quot; to see suggestions.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
